"use client";
import { HiShoppingBag } from "react-icons/hi";
import Image from "next/image";
import BackgroundImage from "@/assets/shopping.jpg";
import { TextField } from "@mui/material";
import Button from '@/app/components/Button'; 
import { ZodIssueCode, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "../components/FormGroup";
import { useCallback } from "react";

const loginFormSchema = z.object({
  usuEmail: z.string().nullable(),
  usuSenha: z.string().nullable()
})
.superRefine((data, ctx) => {
  if (data.usuEmail === '' || !data.usuEmail) {
    ctx.addIssue({
      message: 'Você precisa informar o E-mail',
      code: ZodIssueCode.custom,
      path: ['usuEmail']
    });
  }

  if (data.usuSenha === '' || !data.usuSenha) {
    ctx.addIssue({
      message: 'Você precisa informar a Senha',
      code: ZodIssueCode.custom,
      path: ['usuSenha']
    });
  }
});
type FormSchemaType = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmitHandler = useCallback((formData: FormSchemaType) => {
    console.log('login data: ', formData);
  }, []);

  return (
    <div className="flex h-full w-full p-5">
      <Image className="absolute left-0 top-0 z-[-1] h-full w-full object-cover object-left-bottom" src={BackgroundImage} alt="" />
      <div className="h-fit rounded-md bg-blue-500 text-white drop-shadow-2xl shadow-2xl shadow-blue-500 p-12 text-4xl font-medium">
        Bem vindo a ShopStore !
      </div>
      <div className="ml-auto flex h-full w-[400px] grow-0 flex-col items-center rounded-xl bg-white shadow-md">
        <div className="mt-[50%] h-28 w-28 rounded-full bg-blue-500 p-5"><HiShoppingBag className="h-full w-full text-white" /></div>
        <p className="mt-8">Faça o login para poder prosseguir</p>
        <form className="my-auto gap-5 flex flex-col w-[80%] mx-auto grow pt-10" onSubmit={handleSubmit(onSubmitHandler)}>
          
          <TextField {...register('usuEmail')} variant="outlined" label="E-mail" type="email" error={!!errors?.usuEmail?.message} helperText={errors?.usuEmail?.message} />
          <TextField {...register('usuSenha')} variant="outlined" label="Senha" type="password" error={!!errors?.usuSenha?.message} helperText={errors?.usuSenha?.message} />
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
