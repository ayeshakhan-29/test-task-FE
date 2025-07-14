import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type SignUpPayload = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type SignUpResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export const useSignUp = () => {
  return useMutation<SignUpResponse, AxiosError, SignUpPayload>({
    mutationFn: async (data: SignUpPayload) => {
      const response = await api.post("/auth/signup", data);
      return response.data;
    },
  });
};
