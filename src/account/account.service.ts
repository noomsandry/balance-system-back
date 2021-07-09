import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/transaction/dto/transaction.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
@Injectable()
export class AccountService {
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  async findOne(id: number) {
    return await Account.findOne({
      where: {
        id,
      },
    });
  }

  async update(account: UpdateAccountDto) {
    return Account.update(account.id, account);
  }
}
