import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [AccountModule],
})
export class TransactionModule {}
