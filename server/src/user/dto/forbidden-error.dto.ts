import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenErrorDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({
    example: 'Forbidden resource',
  })
  message: string;

  @ApiProperty({ example: '2024-08-20T02:32:19.108Z' })
  timestamp: Date;

  @ApiProperty({
    example: '/user/readOne/87accf20-1940-4d46-833e-55299845da64',
  })
  path: string;
}
