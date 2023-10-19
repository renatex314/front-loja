"use client";

import Button from "@/app/components/Button";
import UserIcon from "@/app/components/UserIcon";
import { parseFormData, parseStringToDate } from "@/core/utils";
import { useAuthData } from "@/providers/AuthProvider";
import { useFeedback } from "@/providers/FeedbackProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Paper, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  cliNome: z.string().nullable(),
  cliEmail: z.string().nullable(),
  cliRg: z.string().nullable(),
  cliDtNascimento: z
    .date({
      coerce: true,
    })
    .nullable(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const formDefaultValues: FormSchemaType = {
  cliNome: "",
  cliEmail: "",
  cliRg: "",
  cliDtNascimento: null,
};

const AccountPage = () => {
  const feedback = useFeedback();
  const { client } = useAuthData();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = useCallback(
    (data: FormSchemaType) => {
      const parsedFormData = parseFormData(data, {
        preserveEmptyStrings: false,
        preserveNull: false,
        preserveUndefined: false,
      });

      if (Object.keys(parsedFormData).length === 0) {
        feedback({
          message: "Os campos não podem ser todos vazios",
          type: "error",
        });

        return;
      }

      feedback({
        message: "Dados atualizados com sucesso",
        type: "success",
      });
    },
    [feedback]
  );

  useEffect(() => {
    if (client) {
      reset({
        cliNome: client.cliNome,
        cliEmail: client.cliEmail,
        cliRg: client.cliRg,
        cliDtNascimento: client.cliDtNascimento
          ? new Date(client.cliDtNascimento)
          : null,
      });
    }
  }, [client, reset]);

  return (
    <div className="flex justify-center items-start pt-[5%] w-full h-full">
      <Paper elevation={2} className="p-10">
        <div className="flex flex-col w-full mt-5">
          <UserIcon className="w-24 h-24" />
          <p className="text-2xl mt-5">{client?.cliNome}</p>
        </div>
        <Divider className="!mb-5 !mt-2" />
        <p className="text-lg mb-5 text-gray-500">Seus dados</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-5">
            <Controller
              control={control}
              name="cliNome"
              render={({ field }) => (
                <TextField
                  value={field.value || ""}
                  onChange={({ currentTarget: { value } }) =>
                    field.onChange(value)
                  }
                  variant="outlined"
                  label="Nome"
                  error={!!errors?.cliNome?.message}
                  helperText={errors?.cliNome?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="cliEmail"
              render={({ field }) => (
                <TextField
                  value={field.value || ""}
                  onChange={({ currentTarget: { value } }) =>
                    field.onChange(value)
                  }
                  variant="outlined"
                  label="E-Mail"
                  error={!!errors?.cliEmail?.message}
                  helperText={errors?.cliEmail?.message}
                />
              )}
            />
            <TextField
              disabled
              variant="outlined"
              label="CPF"
              value={client?.cliCpf || ""}
            />
            <Controller
              control={control}
              name="cliRg"
              render={({ field }) => (
                <TextField
                  value={field.value || ""}
                  onChange={({ currentTarget: { value } }) =>
                    field.onChange(value)
                  }
                  variant="outlined"
                  label="RG"
                  error={!!errors?.cliRg?.message}
                  helperText={errors?.cliRg?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="cliDtNascimento"
              render={({ field }) => (
                <div className="flex flex-col">
                  <DatePicker
                    label="Data de nascimento"
                    value={field.value || null}
                    onChange={(value) => field.onChange(value)}
                    slotProps={{
                      textField: {
                        error: !!errors?.cliDtNascimento?.message,
                        helperText: errors?.cliDtNascimento?.message,
                      },
                    }}
                  />
                </div>
              )}
            />
          </div>
          <Button className="mt-5 ml-auto" type="submit">
            Atualizar dados
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AccountPage;
