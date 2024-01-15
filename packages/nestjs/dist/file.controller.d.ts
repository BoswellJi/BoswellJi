import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
export declare class FileController {
    getFile(res: Response): Promise<StreamableFile>;
    getStaticFile(): StreamableFile;
}
