import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { EjsService } from '../ejs/ejs.service';

@Module({
  imports: [FirebaseModule],
  controllers: [AdminController],
  providers: [AdminService, EjsService],
})
export class AdminModule {}
