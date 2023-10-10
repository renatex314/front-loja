export interface GetTokenByClientDataProps {
  cliEmail: string;
  cliSenha: string;
}

export interface RegisterClientProps {
  cliNome?: string;
  cliEmail: string;
  cliSenha: string;
  cliCpf: string;
  cliRg?: string;
  cliDtNascimento?: string;
}
