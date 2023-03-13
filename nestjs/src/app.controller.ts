import { Controller, Get, Req} from '@nestjs/common';
import { Body, Query } from '@nestjs/common/decorators';

@Controller()
export class AppController {

  @Get()
  findAll(@Req() request: Request,@Body() body: BodyInit,@Query() query) {
    return query;
  }
}
