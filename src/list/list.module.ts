import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { EjsService } from '../ejs/ejs.service';
@Module({
  imports: [FirebaseModule],
  controllers: [ListController],
  providers: [ListService, EjsService],
})
export class ListModule {}
