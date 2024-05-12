// @ts-nocheck
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req, Request, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { firstValueFrom } from 'rxjs';

@Controller('app')
export class AppController {
  root = 'http://www.t.lvcang.cn';

  constructor(private readonly httpService: HttpService) {}

  // 因为没有处理失败情况，所以只能返回200

  @Get('*')
  async findAllGet(@Req() request: Request) {
    const url = this.root + request.url;

    console.log('*************************');
    console.log('url:' + url);
    console.log('*************************');

    const get = this.httpService.get(url, {
      headers: {
        cookie:
          'SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vkk3Qene5hExFBR%2frh%2f69%2ffDjVAJlMbdmznYv%2fZFVpfT2xEgVm6DJfnz5ivr%2fYx1BcLEQdaSFhqwPFJxkhLmwMusKzgym%2bbcGU%3d',
      },
    });
    const { data } = await firstValueFrom(get);
    return data;
  }

  @Post('*')
  async findAllPost(@Req() request: Request, @Body() body: BodyInit) {
    const url = this.root + request.url;

    console.log('*************************');
    console.log('url:' + url, 'body:' + JSON.stringify(body));
    console.log('*************************');

    const post = this.httpService.post(url, body, {
      headers: {
        cookie:
          'SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vkk3Qene5hExFBR%2frh%2f69%2ffDjVAJlMbdmznYv%2fZFVpfT2xEgVm6DJfnz5ivr%2fYx1BcLEQdaSFhqwPFJxkhLmwMusKzgym%2bbcGU%3d',
      },
    });
    const { data } = await firstValueFrom(post);
    return data;
  }
}
