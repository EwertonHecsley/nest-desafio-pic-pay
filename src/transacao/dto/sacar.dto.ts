import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SacarDto {

    @IsNotEmpty({ message: 'O campo CPF/CNPJ é obrigatório.' })
    @IsString()
    cpf_cnpj: string;

    @IsNotEmpty({ message: 'O campo valor é obrigatório' })
    @IsNumber()
    valor: number;

    @IsOptional()
    id?: number;
}