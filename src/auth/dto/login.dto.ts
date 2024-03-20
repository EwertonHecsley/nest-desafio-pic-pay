import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'O campo E-mail é obrigatório.' })
    @IsString()
    @IsEmail({}, { message: 'E-mail inválido.' })
    email: string;

    @IsNotEmpty({ message: 'O campo Senha é obrigatório.' })
    @IsString()
    senha: string;
}