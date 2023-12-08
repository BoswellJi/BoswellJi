import { Provide, makeHttpRequest } from '@midwayjs/core';
import { WeatherInfo } from '../interface';

@Provide()
export class WeatherService {
  async getWeather(cityId: string): Promise<WeatherInfo> {
    const result = await makeHttpRequest<WeatherInfo>(`http://www.weather.com.cn/data/sk/${cityId}.html`, {
      dataType: 'json',
    });

    if (result.status === 200) {
      return result.data as WeatherInfo;
    }
  }
}