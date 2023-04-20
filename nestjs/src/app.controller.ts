// @ts-nocheck
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req, Request, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  root = 'http://www.qa.lvcang.cn';

  constructor(private readonly httpService: HttpService) {}

  // 因为没有处理失败情况，所以只能返回200

  @Get('*')
  async findAllGet(@Req() request: Request) {
    const url = this.root + request.url;

    console.log('*************************');
    console.log(url);
    console.log('*************************');

    const get = this.httpService.get(url, {
      headers: {
        cookie:
          'route=4675ab113eb814efefdab4e3f152d877; Hm_lvt_be8a067db2aab55915dd40e96c971776=1681129532; ASP.NET_SessionId=dswbiwhvlvjtqn0teh2eh53z; Hm_lpvt_be8a067db2aab55915dd40e96c971776=1681799020; SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vmAm8L6sn774il7HF744pdHW%2b8MKaA1LQd%2fz82uOk%2fXr7bMRqFE05PQDVdq7GbPTUGBxmljwp%2bR70VJ5pXxq4sncwsRAfCZH3k%3d',
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

    console.log(request.headers);

    const post = this.httpService.post(url, body, {
      headers: {
        cookie:
          'route=4675ab113eb814efefdab4e3f152d877; Hm_lvt_be8a067db2aab55915dd40e96c971776=1681129532; ASP.NET_SessionId=dswbiwhvlvjtqn0teh2eh53z; Hm_lpvt_be8a067db2aab55915dd40e96c971776=1681799020; SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vmAm8L6sn774il7HF744pdHW%2b8MKaA1LQd%2fz82uOk%2fXr7bMRqFE05PQDVdq7GbPTUGBxmljwp%2bR70VJ5pXxq4sncwsRAfCZH3k%3d',
      },
    });
    const { data } = await firstValueFrom(post);
    return data;
  }
}
