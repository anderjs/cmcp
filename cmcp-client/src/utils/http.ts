import axios from "axios";
import useStore from "@src/store";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000"
});

httpClient.interceptors.request.use((config) => {
  const { isLoggedIn } = useStore.getState();

  if (isLoggedIn) {
    const { token } = useStore.getState();

    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
})


export default httpClient;