import { ApiProperty } from '@nestjs/swagger';

export class UserAlredyExistsDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Conflict' })
  message: string;

  @ApiProperty({ example: 'User already exists' })
  error: string;
}
