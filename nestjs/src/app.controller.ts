import { Controller, Get, Render, Response , Header} from '@nestjs/common';
import { AppService } from './app.service';
const fs = require('fs');

@Controller()
export class AppController {
  requestNum: number;

  constructor(private readonly appService: AppService) {
    this.requestNum = 0;
  }

  @Get()
  @Render('index.hbs')
  root() {
    this.requestNum++;
    return { message: 'Hello world! nestjs hbs abc dfd', name: 'name', appName: this.requestNum };
  }

  @Get('/file')
  @Render('file.hbs')
  file() {
    return { name: new Buffer('erer') }
  }

  @Get('/fileDown')
  @Header('Content-Type', 'application/octet-stream')
  @Header('Content-Disposition', 'attachment; filename=1.txt')
  fileDown(@Response() res) {
    res.setEncoding('binary');
    const read = fs.createReadStream('./1.txt');
    const write = fs.createWriteStream('./2.txt');
    read.pipe(res);
  }

  @Get('binary')
  @Header('Content-Type', 'application/octet-stream')
  binaryDown(){
    return Buffer.from('季明壮');
  }
}
