"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();

  const handleLogin = (e: any) => {
    router.push("/dash");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(e);
      }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Coloque o email abaixo para fazer o login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="w-full" type="submit">
            Login
          </Button>
          <Link href="signup">
            <Button className="w-full" variant={"secondary"} type="button">
              Cadastro
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
}
