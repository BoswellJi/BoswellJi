import { Controller, Get, Render, Inject } from '@nestjs/common';

@Controller('index')
export class ServerController {
  constructor(@Inject('ASYNC_CONNECTION') public name: string) {
    console.log(name);
  }

  @Get()
  index() {
    return { message: 'Hello world!', name: this.name };
  }
}
