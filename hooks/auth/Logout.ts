import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  };
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear all queries to reset the app state
      queryClient.clear();
    },
  });
};
