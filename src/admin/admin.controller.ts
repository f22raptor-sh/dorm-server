import {
  Controller,
  Post,
  Render,
  Res,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Render('manager_layout')
  async adminInfo() {
    const man_template = await this.adminService.adminInfo();
    return { manager_ara: man_template };
  }

  @Post('del')
  async adminDel(@Res() res: Response, @Body('name') name: string) {
    const result = await this.adminService.adminDel(name);
    return res.status(result.status).json({ message: result.message });
  }

  @Post('edit')
  async adminEdit(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    const result = await this.adminService.adminEdit(name, password);
    return res.status(result.status).json({ message: result.message });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // 파일이 저장될 경로
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname}`;
          cb(null, filename); // 파일 이름 설정
        },
      }),
    }),
  )
  async pointReset(@UploadedFile() file, @Res() res: Response) {
    const filePath = join('./uploads', file.filename);
    const result = await this.adminService.init(filePath);
    if (result.status != 200) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        }
      });
      return res.status(result.status).json({ message: result.message });
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
        return res.status(500);
      } else {
        console.log(`File deleted: ${filePath}`);
        return res.status(200);
      }
    });
  }
}
