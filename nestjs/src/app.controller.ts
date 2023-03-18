import { HttpService, } from '@nestjs/axios';
import { Controller, Get, Req, Request, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {

  root = 'http://www.t.lvcang.cn';

  constructor(private readonly httpService: HttpService) { }

  @Get('*')
  async findAllGet(@Req() request: Request) {
    const url = this.root + request.url;
    const get = this.httpService.get(url, {
      headers: {
        cookie: 'route=4675ab113eb814efefdab4e3f152d877; ASP.NET_SessionId=clvfnimsfeoumetpduulgmjz; Hm_lvt_be8a067db2aab55915dd40e96c971776=1677137029,1677482533,1678674335,1678855116; SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vmoyaTyZLEs7sHxDVPfD9aNYRDwsJZCq%2bTmnQ9YN40yhWd5DhQRCEZiLJ4UTQWULMrvcDGyJ1uHacpGSWIgJO07q7Lqa73lv14%3d; Hm_lpvt_be8a067db2aab55915dd40e96c971776=1678950074'
      }
    });
    const { data } = await firstValueFrom(
      get
    );
    return data;
  }

  @Post('*')
  async findAllPost(@Req() request: Request, @Body() body: BodyInit) {
    const url = this.root + request.url;
    const post = this.httpService.post(url, body, {
      headers: {
        cookie: 'route=4675ab113eb814efefdab4e3f152d877; ASP.NET_SessionId=clvfnimsfeoumetpduulgmjz; Hm_lvt_be8a067db2aab55915dd40e96c971776=1677137029,1677482533,1678674335,1678855116; SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vmoyaTyZLEs7sHxDVPfD9aNYRDwsJZCq%2bTmnQ9YN40yhWd5DhQRCEZiLJ4UTQWULMrvcDGyJ1uHacpGSWIgJO07q7Lqa73lv14%3d; Hm_lpvt_be8a067db2aab55915dd40e96c971776=1678950074'
      }
    });
    const { data } = await firstValueFrom(
      post,
    );
    return data;
  }
}
