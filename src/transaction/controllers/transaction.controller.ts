import { Controller, Get } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  @Get()
  findAll() {
    return 'This actions return all transaction';
  }
}
