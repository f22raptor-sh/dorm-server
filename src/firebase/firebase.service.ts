// firebase.service.ts
import { Injectable } from '@nestjs/common';
import { Database } from 'firebase-admin/lib/database/database';
import { join } from 'path';

const admin = require('firebase-admin');
const serviceAccount = require(
  join(
    process.cwd(),
    '/key/dormitory-server-firebase-adminsdk-1bg21-91498cdcb6.json',
  ),
);

@Injectable()
export class FirebaseService {
  private database: Database;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://dormitory-server-default-rtdb.firebaseio.com/',
    });
    this.database = admin.database();
  }

  async push(path: string, data) {
    try {
      const ref = this.getRef(path);
      await ref.push(data);
      return { status: 200, message: 'Data successfully pushed' }; // 성공 시 메시지
    } catch (error) {
      console.error('Push error:', error); // 오류 출력
      return { status: 500, message: `Error pushing data: ${error.message}` }; // 오류 메시지
    }
  }

  // 데이터 설정
  async set(path: string, data) {
    try {
      const ref = this.getRef(path);
      await ref.set(data);
      return { status: 200, message: 'Data successfully set' }; // 성공 시 메시지
    } catch (error) {
      console.error('Set error:', error); // 오류 출력
      return { status: 500, message: `Error setting data: ${error.message}` }; // 오류 메시지
    }
  }

  // 데이터 업데이트
  async update(path: string, data) {
    try {
      const ref = this.getRef(path);
      await ref.update(data);
      return { status: 200, message: 'Data successfully updated' }; // 성공 시 메시지
    } catch (error) {
      console.error('Update error:', error); // 오류 출력
      return { status: 500, message: `Error updating data: ${error.message}` }; // 오류 메시지
    }
  }

  // 데이터 삭제
  async remove(path: string) {
    try {
      const ref = this.getRef(path);
      await ref.remove();
      return { status: 200, message: 'Data successfully removed' }; // 성공 시 메시지
    } catch (error) {
      console.error('Remove error:', error); // 오류 출력
      return { status: 500, message: `Error removing data: ${error.message}` }; // 오류 메시지
    }
  }

  // 데이터 가져오기
  async get(path: string) {
    try {
      const ref = this.getRef(path);
      const snapshot = await ref.get();
      const data = snapshot.val();
      return {
        status: 200,
        message: 'Data successfully retrieved',
        data: data,
      }; // 성공 시 데이터 포함 메시지
    } catch (error) {
      console.error('Get error:', error); // 오류 출력
      return {
        status: 500,
        message: `Error retrieving data: ${error.message}`,
      }; // 오류 메시지
    }
  }

  private getRef(path: string) {
    return this.database.ref(path);
  }
}
