import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "@src/types/common";
import type { StateCreator } from "zustand";


type State = {
  user: IUser | null;
  token: string | null;
  isLoggedIn: boolean;
  refreshToken: string | null;
};

type Actions = {
  clear: () => void;
  setSession: ({
    token,
    refreshToken,
  }: Pick<State, "token" | "refreshToken">) => void;
  setUser: (user: IUser) => void;
};

const useStore = create<State & Actions>()(
  persist(
    ((set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      refreshToken: null,
      setUser: (user) => {
        set(() => ({
          user,
        }));
      },
      clear: () => {
        set(() => ({
          user: null,
          token: null,
          isLoggedIn: false,
          refreshToken: null,
        }));
      },
      setSession: ({ token, refreshToken }) => {
        const user = jwtDecode(token as string) as IUser;

        set(() => ({
          user,
          token,
          refreshToken,
          isLoggedIn: true,
        }));
      },
    })) as StateCreator<
      State & Actions,
      [],
      [["zustand/persist", unknown]],
      State & Actions
    >,
    {
      name: "CMCP-storage",
      partialize: (state) => ({
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        const token = state?.token;
        if (token) {
          try {
            const user = jwtDecode(token) as IUser;
            state?.setUser(user);
          } catch {
            state?.clear();
          }
        }
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
