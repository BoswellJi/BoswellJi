import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ServerController} from './server.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController,ServerController],
  providers: [AppService],
})
export class AppModule {}
