'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaSignup } from "@/schemas/schemaSignup"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import usePost from "@/hooks/usePost"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "../ui/use-toast"
import Loading from "../ui/loading"

interface SignupFormValues {
  USER_NAME?: string;
  USER_EMAIL?: string;
  USER_PASSWORD?: string;
}

export default function SignupForm() {
  const { login } = useAuth();
  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schemaSignup)
  })

  const [posted, setPosted] = useState(false);
  const [data, setData] = useState<SignupFormValues>({ USER_EMAIL: '', USER_NAME: '', USER_PASSWORD: '' });

  const { token, isPosted, isPosting, error, error409 } = usePost<SignupFormValues>(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, data, posted);

  const submitForm: SubmitHandler<SignupFormValues> = (formData) => {
    setData(formData)
    setPosted(true)
  }

  useEffect(() => {
    if (error409) {
      setPosted(false)
      toast({
        title: error409.error,
        description: error409.message
      })
    }
    if (error) {
      setPosted(false)
      toast({
        title: error.error,
        description: error.message
      })
    }
    if (isPosted) {
      setPosted(false)
      const TokenUser = token?.token as string;
      localStorage.setItem('token', TokenUser)
      const TokenAdmin = token?.tokenAdmin as string;
      if (TokenAdmin) {
        localStorage.setItem('tokenAdmin', TokenAdmin)
      }
      login()
    }
  }, [error409, error, isPosted]);

  if (isPosting) {
    return <Loading />;
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Card style={{
        width: '30rem',
        maxWidth: '98vw',
        border: 'none'
      }}>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="space-y-2">
              <FormField
                control={form.control}
                name="USER_NAME"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome"
                        type="text"
                        id="USER_NAME"
                        {...field}
                        {...form.register('USER_NAME')}
                      />
                    </FormControl>
                    <FormMessage style={{fontSize: '12px'}} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="USER_EMAIL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email"
                        type="email"
                        id="USER_EMAIL"
                        {...field}
                        {...form.register('USER_EMAIL')}
                      />
                    </FormControl>
                    <FormMessage style={{fontSize: '12px'}} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="USER_PASSWORD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        id="USER_PASSWORD"
                        {...field}
                        {...form.register('USER_PASSWORD')}
                      />
                    </FormControl>
                    <FormMessage style={{fontSize: '12px'}} />
                  </FormItem>
                )}
              />
              <div>
                <Button className="w-full mt-4" type="submit">Cadastar</Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/" className="underline">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}