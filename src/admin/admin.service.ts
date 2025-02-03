import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { EjsService } from '../ejs/ejs.service';
import * as fs from 'fs';
import * as xlsx from 'xlsx';

@Injectable()
export class AdminService {
  constructor(
    private firebase: FirebaseService,
    private ejs: EjsService,
  ) {}

  async adminInfo() {
    const res = await this.firebase.get('/manager');
    const data = res['data'];
    let man_temp = '';
    const dataList = Object.keys(data).map((key) => ({
      key,
      value: data[key],
    }));
    for (var i in dataList) {
      const child_data = dataList[i];
      if (child_data['key'] != 'std_list' && child_data['key'] != 'master') {
        man_temp += await this.ejs.render('man_card', {
          name: child_data['key'],
          password: child_data['value'],
        });
      }
    }
    return man_temp;
  }

  async adminDel(name: string) {
    return await this.firebase.remove('/manager/' + name);
  }
  async adminEdit(name: string, password: string) {
    const updates = {};
    updates[name] = password;
    return await this.firebase.update('/manager', updates);
  }

  async init(filePath: string) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const range = xlsx.utils.decode_range(sheet['!ref']);

    let updates = {};
    let updates2 = {};

    const ref = await this.firebase.get('manager/std_list');
    const data = ref['data'];

    for (let std_num in data) {
      this.firebase.remove('/' + std_num);
    }

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const cellA = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 0 })]; // A열
      const cellB = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })]; // B열

      if (cellA && cellB) {
        const dataA = cellA.v; // A열 데이터
        const dataB = cellB.v; // B열 데이터

        const temp = {};
        temp['number'] = dataA;
        temp['name'] = dataB;
        temp['log'] = { '0000-00-00-00:00:00': '상벌점 초기화됨' };
        temp['plus_point'] = 0;
        temp['minus_point'] = 0;
        temp['extra_plus_point'] = 0;
        temp['extra_minus_point'] = 0;
        temp['state'] = 0;
        temp['start_day'] = 0;
        temp['end_day'] = 0;
        updates[dataA] = temp;
        updates2[dataA] = '';
      }
    }
    await this.firebase.update('/', updates);
    return await this.firebase.set('/manager/std_list', updates2);
  }
}
