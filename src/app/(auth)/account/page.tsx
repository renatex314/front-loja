"use client";

import Button from "@/app/components/Button";
import { parseStringToDate } from "@/core/utils";
import { useAuthData } from "@/providers/AuthProvider";
import { Divider, Paper, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FaUserAstronaut } from "react-icons/fa";

const AccountPage = () => {
  const { client } = useAuthData();

  return (
    <div className="flex justify-center items-start pt-[5%] w-full h-full">
      <Paper elevation={2} className="p-10">
        <div className="flex flex-col w-full mt-5">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex justify-center items-center mx-auto my-auto">
            <FaUserAstronaut className="text-white w-[50%] h-[50%]" />
          </div>
          <p className="text-2xl mt-5">{client?.cliNome}</p>
        </div>
        <Divider className="!mb-5 !mt-2" />
        <p className="text-lg mb-5 text-gray-500">Seus dados</p>
        <div className="grid grid-cols-3 gap-5">
          <TextField
            variant="outlined"
            label="Nome"
            value={client?.cliNome || ""}
          />
          <TextField
            variant="outlined"
            label="E-Mail"
            value={client?.cliEmail || ""}
          />
          <TextField
            variant="outlined"
            label="CPF"
            value={client?.cliCpf || ""}
          />
          <TextField
            variant="outlined"
            label="RG"
            value={client?.cliRg || ""}
          />
          <DatePicker
            label="Data de nascimento"
            value={parseStringToDate(client?.cliDtNascimento)}
          />
        </div>
        <Button className="mt-5 ml-auto" type="submit">
          Atualizar dados
        </Button>
      </Paper>
    </div>
  );
};

export default AccountPage;
