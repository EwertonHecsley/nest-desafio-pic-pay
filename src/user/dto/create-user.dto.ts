import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'O campo Nome Completo é obrigatóro.' })
    @IsString()
    nomeCompleto: string;

    @IsNotEmpty({ message: 'O campo CPF/CNPJ é obrigatório.' })
    @IsString()
    cpf_cnpj: string;

    @IsNotEmpty({ message: 'O campo E-mail é obrigatório.' })
    @IsString()
    @IsEmail({}, { message: 'Formato de E-mail inválido.' })
    email: string;

    @IsNotEmpty({ message: 'O campo Senha é obrigatório.' })
    @IsString()
    @MinLength(4, { message: 'Tamanho mímino da senha deve ser 4 caracteres.' })
    @MaxLength(12, { message: 'Tamanho máximo da senha deve ser 12 caracteres.' })
    senha: string;

    @IsNotEmpty({ message: 'O campo logista é obrigatório.' })
    @IsBoolean()
    logista: boolean;

    @IsOptional()
    saldo: number;

    @IsOptional()
    id?: number
}