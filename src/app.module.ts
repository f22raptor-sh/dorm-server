import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PointModule } from './point/point.module';
import { ListModule } from './list/list.module';
import { EjsService } from './ejs/ejs.service';
import { CalenderModule } from './calender/calender.module';
import { AdminModule } from './admin/admin.module';
import { KakaoModule } from './kakao/kakao.module';
import { AndroidModule } from './android/android.module';

@Module({
  imports: [
    UserModule,
    PointModule,
    ListModule,
    CalenderModule,
    AdminModule,
    KakaoModule,
    AndroidModule,
  ],
  controllers: [AppController],
  providers: [AppService, EjsService],
})
export class AppModule {}
