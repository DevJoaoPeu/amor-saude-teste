import { RegionalNotFoundDto } from "src/regionals/dto/regional-notfound.dto";
import { CreateClinicDto } from "../dto/create-clinics.dto";
import { UserAlredyExistsDto } from "src/user/dto/user-exists.dto";

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

export const deleteReturn = {
    message: 'Record deleted successfully',
    affected: 1,
};

export const clinicsNotFound = {
    statusCode: 404,
    message: "Clinics not found",
    timestamp: "2024-08-20T02:32:19.108Z",
    path: "/clinics/readOne/87accf20-1940-4d46-833e-55299845da64"
}

export const errorResponse: UserAlredyExistsDto = {
    statusCode: 409,
    error: 'User already exists',
    message: 'Conflict',
};

export const userId: string = '87accf20-1940-4d46-833e-55299845da64';