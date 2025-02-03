import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private firebase: FirebaseService) {}

  async checkuser(name: string, pw: string): Promise<Number> {
    // const { status, message, data } = await this.firebase.get('/manager');
    const res = await this.firebase.get('/manager');
    const manager = res['data'];
    if (name in manager) {
      //관리자 목록에 아이디가 있는지 확인
      if (pw === manager[name]) {
        // 비밀번호 일치 여부 확인
        if (name === 'master') {
          // 최상위 관리자 확인
          return 2;
        } else {
          return 1;
        }
      } else {
        console.log(pw);
      }
    } else {
      console.log(name);
    }
    // return value
    // 0 : 일치하는 관리자 없음
    // 1 : 일반 관리자
    // 2 : 최고 관리자
    return 0;
  }

  checkAuth(auth: string): number {
    if (!auth) {
      return 4;
    }
    if (auth == 'master') {
      return 2;
    } else {
      return 1;
    }
  }

  async change(name: string, pw: string) {
    var updates = {};
    updates[name] = pw;
    return await this.firebase.update('manager', updates);
  }
}
