import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  MainPage(): string {
    return 'Hello World!';
  }
}
