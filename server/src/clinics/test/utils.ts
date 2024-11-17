import { RegionalNotFoundDto } from "src/regionals/dto/regional-notfound.dto";
import { CreateClinicDto } from "../dto/create-clinics.dto";

export const regionalNotFound = {
    statusCode: 404,
    error: 'Not Found ',
    message: 'Regional not found',
};

export const body: CreateClinicDto = {
    razaoSocial: "Clinica 1",
    nomeFantasia: "clinics 1",
    cnpj: "03151050000168",
    dataInauguracao:  "2024-08-15",
    regional: "75bec007-474e-48a7-b85b-c3dbc6e81864"
}