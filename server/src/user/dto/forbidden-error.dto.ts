import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenErrorDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Forbidden resource' })
  message: string;

  @ApiProperty({ example: 'Forbidden.' })
  error: string;
}
