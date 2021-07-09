import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountService } from 'src/account/account.service';
import { Connection } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    private connection: Connection,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const account = await this.accountService.findOne(
      createTransactionDto.account_id,
    );
    if (!account) {
      throw new Error(
        `Account not found. ACCOUNT_ID = ${createTransactionDto.account_id}`,
      );
    }

    if (createTransactionDto.balance <= 0)
      throw new Error('Transaction amount can not <= 0');

    /**
     * compute new balance
     */
    if (createTransactionDto.type === 'WITHDRAWN') {
      account.balance -= createTransactionDto.amount;
    } else if (createTransactionDto.type === 'DEPOSITE') {
      account.balance += createTransactionDto.amount;
    } else {
      throw new Error('unknow operation type');
    }

    createTransactionDto.balance = account.balance;

    /**
     * save transaction
     * update account balance
     */
    let newTransaction;

    const transaction = await this.transactionService.create(
      createTransactionDto,
    );
    transaction.account = account;

    /**
     * start transaction
     */
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      newTransaction = await queryRunner.manager.save(transaction);
      await queryRunner.manager.update(
        Account,
        { id: account.id },
        { balance: account.balance },
      );
      await queryRunner.commitTransaction();

      /**
       * end transaction
       */
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return newTransaction;
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const account = await this.accountService.findOne(req.user.userId);
    if (!account) {
      throw new Error('Account not found');
    }
    return this.transactionService.findByAccountId(account.id);
  }
}
