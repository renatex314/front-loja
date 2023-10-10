"use client";

import Image from "next/image";
import BackgroundImage from "@/assets/shopping.jpg";
import { HiShoppingBag } from "react-icons/hi";
import { TextField } from "@mui/material";
import Link from "next/link";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers";
import Button from "../components/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useCallback, useEffect } from "react";
import {
  assertFormDataFields,
  parseDateToAPI,
  parseFormData,
} from "@/core/utils";
import { useMutation } from "@tanstack/react-query";
import { RegisterClientProps } from "@/services/auth/types";
import services from "@/services";
import { AxiosError } from "axios";
import { useFeedback } from "@/providers/FeedbackProvider";
import { authorization } from "@/core";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    cliNome: z.string(),
    cliEmail: z.string(),
    cliSenha: z.string(),
    cliSenhaConfirm: z.string(),
    cliCpf: z.string(),
    cliRg: z.string().nullable(),
    cliDtNascimento: z
      .date({
        coerce: true,
      })
      .nullable(),
  })
  .superRefine((formData, ctx) => {
    if (!formData.cliNome || formData.cliNome === "") {
      ctx.addIssue({
        message: "Nome é obrigatório",
        code: z.ZodIssueCode.custom,
        path: ["cliNome"],
      });
    }

    if (!formData.cliEmail || formData.cliEmail === "") {
      ctx.addIssue({
        message: "E-mail é obrigatório",
        code: z.ZodIssueCode.custom,
        path: ["cliEmail"],
      });
    }

    if (!formData.cliSenha || formData.cliSenha === "") {
      ctx.addIssue({
        message: "Senha é obrigatória",
        code: z.ZodIssueCode.custom,
        path: ["cliSenha"],
      });
    }

    if (formData.cliSenhaConfirm !== formData.cliSenha) {
      ctx.addIssue({
        message: "As senhas não são iguais",
        code: z.ZodIssueCode.custom,
        path: ["cliSenhaConfirm"],
      });
    }

    if (!formData.cliCpf || formData.cliCpf === "") {
      ctx.addIssue({
        message: "CPF é obrigatório",
        code: z.ZodIssueCode.custom,
        path: ["cliCpf"],
      });
    }
  });

type FormSchemaType = z.infer<typeof formSchema>;

const formDefaultValues: FormSchemaType = {
  cliCpf: "",
  cliDtNascimento: null,
  cliEmail: "",
  cliNome: "",
  cliRg: null,
  cliSenha: "",
  cliSenhaConfirm: "",
};

const RegisterPage = () => {
  const router = useRouter();
  const feedback = useFeedback();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const { mutate: mutateRegister, isLoading: isRegisterLoading } = useMutation({
    mutationFn: async (registerData: RegisterClientProps) =>
      await services.auth.registerUser(registerData),
    onSuccess(token) {
      authorization.saveAccessToken(token);

      feedback({
        message: "Cadastro realizado com sucesso, seja bem-vindo !",
        type: "success",
      });
    },
    onError(error: AxiosError<string>) {
      feedback({
        message: error?.response?.data?.toString() || "",
        type: "error",
      });
    },
  });

  const onSubmitHandler = useCallback(
    (formData: FormSchemaType) => {
      const registerData: Partial<RegisterClientProps> = {
        cliNome: formData.cliNome,
        cliCpf: formData.cliCpf,
        cliEmail: formData.cliEmail,
        cliSenha: formData.cliSenha,
        cliDtNascimento: parseDateToAPI(formData?.cliDtNascimento),
        cliRg: formData.cliRg?.toString(),
      };

      const parsedFormData = parseFormData(registerData, {
        preserveNull: false,
        preserveEmptyStrings: false,
        preserveUndefined: false,
      });

      mutateRegister(parsedFormData as RegisterClientProps);
    },
    [mutateRegister]
  );

  useEffect(() => {
    authorization.setOnUpdateAccessToken(() => {
      if (authorization.getAccessToken()) {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <div className="flex h-full w-full p-5">
      <Image
        className="absolute left-0 top-0 z-[-1] h-full w-full object-cover object-left-bottom"
        src={BackgroundImage}
        alt=""
      />
      <div className="h-fit rounded-md bg-blue-500 text-white drop-shadow-2xl shadow-2xl shadow-blue-500 p-12 text-4xl font-medium">
        Bem vindo a ShopStore !
      </div>
      <div className="ml-auto flex h-full w-[600px] grow-0 flex-col items-center rounded-xl bg-white shadow-md">
        <div className="mt-[20%] h-28 w-28 rounded-full bg-blue-500 p-5">
          <HiShoppingBag className="h-full w-full text-white" />
        </div>
        <p className="mt-8">Insira os dados:</p>
        <p className="text-xs text-center">
          Já possui uma conta ?{" "}
          <Link className="text-blue-700 underline" href={"/login"}>
            clique aqui para fazer login
          </Link>
        </p>
        <form
          className="grid grid-cols-2 gap-3 w-[80%] mx-auto pt-10"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            label="Nome"
            error={!!errors?.cliNome}
            helperText={errors?.cliNome?.message?.toString()}
            {...register("cliNome")}
          />
          <TextField
            label="E-mail"
            type="email"
            error={!!errors?.cliEmail}
            helperText={errors?.cliEmail?.message?.toString()}
            {...register("cliEmail")}
          />
          <TextField
            label="CPF"
            error={!!errors?.cliCpf}
            helperText={errors?.cliCpf?.message?.toString()}
            {...register("cliCpf")}
          />
          <TextField
            label="RG"
            error={!!errors?.cliRg}
            helperText={errors?.cliRg?.message?.toString()}
            {...register("cliRg")}
          />
          <Controller
            control={control}
            name="cliDtNascimento"
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(value) => {
                  console.log(value);
                  field.onChange(value);
                }}
                label="Data de nascimento"
                className="col-span-2"
              />
            )}
          />
          <TextField
            label="Senha"
            type="password"
            error={!!errors?.cliSenha}
            helperText={errors?.cliSenha?.message?.toString()}
            {...register("cliSenha")}
          />
          <TextField
            label="Digite a senha novamente"
            type="password"
            error={!!errors?.cliSenhaConfirm}
            helperText={errors?.cliSenhaConfirm?.message?.toString()}
            {...register("cliSenhaConfirm")}
          />

          <Button
            loading={isRegisterLoading}
            type="submit"
            className="col-span-2"
          >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
