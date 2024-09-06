# Amor Saúde Teste

Este é um projeto para gerenciar clínicas e especialidades, além de criar e autenticar usuários. O aplicativo utiliza o NestJS no backend, com TypeORM para interagir com o banco de dados.

## Estrutura do Banco de Dados

O banco de dados é composto pelas seguintes tabelas:

### 1. `clinics`

Armazena informações sobre clínicas.

- **id**: Identificador único da clínica (UUID).
- **razaoSocial**: Razão social da clínica (string).
- **nomeFantasia**: Nome fantasia da clínica (string).
- **cnpj**: CNPJ da clínica (string, formato `XX.XXX.XXX/XXXX-XX`).
- **dataInauguracao**: Data de inauguração da clínica (date).
- **ativa**: Status da clínica (boolean).
- **regional**: Relacionamento com a entidade `RegionalEntity`.
- **createdAt**: Data e hora de criação (timestamp).
- **updatedAt**: Data e hora da última atualização (timestamp).

### 2. `clinics_specialties`

Tabela de relacionamento entre clínicas e especialidades.

- **id**: Identificador único (UUID).
- **clinic**: Relacionamento com a entidade `ClinicEntity`.
- **specialty**: Relacionamento com a entidade `SpecialtiesEntity`.

### 3. `specialties`

Armazena informações sobre especialidades.

- **id**: Identificador único da especialidade (UUID).
- **name**: Nome da especialidade (string).

### 4. `regionals`

Armazena informações sobre as regionais das clínicas.

- **id**: Identificador único da regional (UUID).
- **name**: Nome da regional (string).

### 5. `auth` e `user`

Tabela para criação e autenticação de usuários.

## Configuração do Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/DevJoaoPeu/amor-saude-teste.git
   cd amor-saude-teste
   ```

2. **Instalar as dependencias**

   ```bash
   npm i
   ```