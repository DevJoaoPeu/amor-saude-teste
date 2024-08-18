import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class JwtDto {
  @IsJWT()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0ODYwMjYzLWNhMjYtNDJkMy1hMzlhLTY0YWE3ZDgyN2MxMiIsImVtYWlsIjoiam9hbzRAdGVzdGUuY29tIiwiaWF0IjoxNzIzOTg2MDM0LCJleHAiOjE3MjQ1OTA4MzQsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiI4NDg2MDI2My1jYTI2LTQyZDMtYTM5YS02NGFhN2Q4MjdjMTIifQ.6QoXVXSkGNOZ09voB8AWSXQDFDy42TP5gxxKv-mzGDs',
  })
  token: string;
}
