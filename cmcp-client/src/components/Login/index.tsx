import { memo } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { LoginSchema } from "@src/schema/login.schema";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { Button, Input, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

type LoginProps = {
  form: UseFormReturn<LoginSchema>;
  onSubmit: (value: LoginSchema) => void;
};

const Login: React.FC<LoginProps> = ({ form, onSubmit }) => {
  const errors = form.formState.errors;

  const handleError = () => {
    notifications.show({
      color: "red",
      message: "Email or invalid password"
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, handleError)}>
      <div className="flex flex-col gap-2.5">
        <Controller
          name="email"
          render={({ field }) => (
            <Input.Wrapper label="Email" required>
              <TextInput
                type="email"
                value={field.value}
                leftSection={<MdOutlineAlternateEmail className="text-emerald-300" />}
                error={errors.email?.message}
                placeholder="Login as admin"
                onChange={(e) => field.onChange(e.target.value)}
              />
            </Input.Wrapper>
          )}
          control={form.control}
        />
        <Controller
          name="password"
          render={({ field }) => (
            <Input.Wrapper label="Password" required>
              <TextInput
                type="password"
                value={field.value}
                placeholder="Password"
                leftSection={<RiLockPasswordFill className="text-emerald-300" />}
                error={errors.password?.message}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </Input.Wrapper>
          )}
          control={form.control}
        />
      </div>
      <Button fullWidth type="submit" mt="md" color="green">
        Login now
      </Button>
    </form>
  );
};

export default memo(Login);
