import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedLoginDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Email e/ou senha incorretos' })
  message: string;

  @ApiProperty({ example: 'Unauthorized.' })
  error: string;
}
