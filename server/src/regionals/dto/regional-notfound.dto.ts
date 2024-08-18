import { ApiProperty } from '@nestjs/swagger';

export class RegionalNotFoundDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({
    example: 'Regional not found',
  })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
