import { z } from "zod";

export const SignInFormSchema = z.object({
  username: z.string().trim(),
  password: z.string(),
});

export type SignInFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
