"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";
import { config } from "@/config";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          localStorage.setItem(config.auth.tokenKey, response.token);
          toast.success(response.message);
          navigate("/");
          setIsLoading(false);
        },
        onError: (error: any) => {
          console.error("Login error:", error);
          setIsLoading(false);

          const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.response?.data?.errors ||
            error.message ||
            "Failed to login.";

          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 sm:p-12">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-8">
          <div className="flex items-center text-lg font-semibold text-gray-800">
            <Globe className="h-6 w-6 mr-2 text-gray-600" />
            URL Analyzer
          </div>
        </div>

        <h2 className="text-4xl text-gray-900 mb-2 font-medium">
          Welcome Back
        </h2>
        <p className="text-gray-600 mb-8">
          Enter your email and password to access your account
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-base font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 bg-gray-50 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-base font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 bg-gray-50 pl-10 pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <CardFooter>
          <div className="mt-1 text-center text-base text-muted-foreground w-full">
            {"Don't have an account? "}
            <Button
              variant="link"
              className="px-0 text-base font-medium text-primary hover:text-primary/80"
              onClick={() => navigate("/signup")}
              disabled={isPending}
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
