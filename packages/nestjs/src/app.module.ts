import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileController } from './file.controller';
import { HttpModule } from '@nestjs/axios';
import { ServerController } from './server.controller';

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('test22');
    }, 1000);
  });
}

@Module({
  imports: [HttpModule],
  controllers: [AppController, FileController, ServerController],
  providers: [
    // 异步提供器，将应用的启动延迟到成功
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        const data = await sleep();
        return data;
      },
    },
  ],
})
export class AppModule {}
