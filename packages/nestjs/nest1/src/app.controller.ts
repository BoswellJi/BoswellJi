import { Controller, Get, StreamableFile, Res, Header } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import axios from 'axios';

@Controller('file')
export class AppController {
  @Get('/test1')
  async getFile(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { data } = await axios.request({
      method: 'get',
      url: 'https://file.40017.cn/feresource/pdf/lcfwxy.pdf',
      responseType: 'arraybuffer',
    });
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="test.pdf"',
    });
    return new StreamableFile(data);
  }

  @Get('/test2')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getStaticFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
