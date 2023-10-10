import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class ServerController {
  @Get()
  @Render('index')
  index(){
    return { message: 'Hello world!' };
  }
}