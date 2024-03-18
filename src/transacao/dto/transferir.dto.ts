import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransferenciaDto {

    @IsNotEmpty({ message: 'O campo CPF/CNPJ de destino é obrigatório.' })
    @IsString()
    destinoCPF_CNPJ: string;

    @IsNotEmpty({ message: 'O campo CPF/CNPJ de origem é obrigatório.' })
    @IsString()
    origemCPF_CNPJ: string;

    @IsNotEmpty()
    @IsNumber()
    valor: number
}