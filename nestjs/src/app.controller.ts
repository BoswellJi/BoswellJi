import { Controller, Get, Req } from '@nestjs/common';
import { Body, Query, Res } from '@nestjs/common/decorators';
import { Response, Request } from 'express';

@Controller()
export class AppController {

  @Get()
  findAll(@Req() req: Request, @Body() body: BodyInit, @Query() query, @Res() res: Response) {
    console.log(req);

    res.end('test');
  }
}
