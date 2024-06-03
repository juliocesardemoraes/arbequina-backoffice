import { Cadastro } from "@/components/Cadastro/Cadastro";
import Header from "@/components/Header/Header";
import React from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header></Header>
      <Cadastro></Cadastro>
    </main>
  );
}
