import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  async create(createTransaction: CreateTransactionDto) {
    const transaction = Transaction.create(createTransaction);
    return await transaction.save();
  }

  async findByAccountId(id): Promise<Transaction[]> {
    return await Transaction.find({
      where: {
        account: {
          id,
        },
      },
    });
  }
}
