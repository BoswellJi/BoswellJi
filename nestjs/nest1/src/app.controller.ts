import { Controller, Get, Header } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  @Header('content-type', 'application/pdf')
  async getHello() {
    const { data } = await axios.request({
      method: 'get',
      url: 'https://file.40017.cn/feresource/pdf/lcfwxy.pdf',
      responseType: 'arraybuffer',
    });
    let buff = Buffer.alloc(0);
    buff = Buffer.concat([buff, data]);
    return buff;
  }
}
