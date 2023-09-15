import { Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';

@Controller('cats')
export class CatsController {
  @Post()
  findAll() { 
    return 'controller cats'
  }
}
