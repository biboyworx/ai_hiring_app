import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: LoginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
