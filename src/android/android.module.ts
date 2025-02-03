import { Module } from '@nestjs/common';
import { AndroidService } from './android.service';
import { AndroidController } from './android.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [FirebaseModule, HttpModule],
  controllers: [AndroidController],
  providers: [AndroidService],
})
export class AndroidModule {}
