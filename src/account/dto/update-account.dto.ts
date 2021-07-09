import { IsNotEmpty } from 'class-validator';

export class UpdateAccountDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  balance: number;
}
