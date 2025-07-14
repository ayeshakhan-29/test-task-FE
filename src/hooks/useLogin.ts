import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export const useLogin = () => {
  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
  });
};
