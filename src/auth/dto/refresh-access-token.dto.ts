import { IsNotEmpty } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}
