import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';

@Injectable()
export class EjsService {
  async render(templateName: string, data: any): Promise<string> {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'views',
      `${templateName}.ejs`,
    );
    return new Promise((resolve, reject) => {
      renderFile(filePath, data, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }
}
