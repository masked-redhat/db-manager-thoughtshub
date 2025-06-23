"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PleaseWait from "./PleaseWait";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";

// Zod schema definition
const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Username should be greater than 3 characters" })
    .max(50, { message: "Username cannot be greater than 50 characters" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Component definition
export default function LoginForm(): ReactElement {
  const { setAuthToken } = useAuthToken();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setLoading(true);

    const client = new APIClient(null);
    const result = await client.fetch("POST", "/login", values);

    if (result.ok) {
      toast("Login success", { description: result.json.message });
      setAuthToken(result.json.auth_token);
      APIClient.setAuthTokenInBrowser(result.json.auth_token);
    } else {
      toast("Login failed", { description: result.json.message });
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full p-2 flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Admin Account</CardDescription>
            </CardHeader>
            <CardContent className="w-84 space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin-username"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin-password"
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? <PleaseWait /> : <span>Submit</span>}
              </Button>
            </CardContent>
            <CardFooter>
              <p>&copy; ThoughtsHub 2025</p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
