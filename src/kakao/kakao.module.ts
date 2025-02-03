import { Module } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { KakaoController } from './kakao.controller';
import { FirebaseModule } from '../firebase/firebase.module';
@Module({
  imports: [FirebaseModule],
  controllers: [KakaoController],
  providers: [KakaoService],
})
export class KakaoModule {}
