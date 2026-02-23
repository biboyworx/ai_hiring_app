import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";

export interface SignUpCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const signupUser = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpCredentials) => {
  // Linking.createURL('/') automatically resolves to 'exp://...' in dev and 'myapp://...' in prod
  const redirectUrl = Linking.createURL("/");
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        firstName,
        lastName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: signupUser,
  });
};
