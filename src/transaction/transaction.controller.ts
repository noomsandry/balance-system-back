import { Controller, Get } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  constructor() {}
  @Get()
  findAll() {
    return 'This actions return all transaction';
  }
}
