import { IsNotEmpty } from 'class-validator';
import { Account } from 'src/account/entities/account.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  account_id: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  balance: number;

  account: Account;
}
