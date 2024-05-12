import { HttpService } from '@nestjs/axios';
export declare class AppController {
    private readonly httpService;
    root: string;
    constructor(httpService: HttpService);
    findAllGet(request: Request): Promise<any>;
    findAllPost(request: Request, body: BodyInit): Promise<any>;
}
