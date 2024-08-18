import { ApiProperty } from '@nestjs/swagger';

export class UserdNotFoundDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({
    example: 'User with ID 23266745-e633-401b-8422-6de304455398 not found',
  })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
