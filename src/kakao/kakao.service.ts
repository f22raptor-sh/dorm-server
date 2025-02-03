import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class KakaoService {
  constructor(private firebase: FirebaseService) {}

  async kakaoRes(
    method: string,
    user_id: string,
    user_input: string,
  ): Promise<string> {
    const res = await this.firebase.get('/manager/std_list');
    const data = res['data'];
    let found = false;

    if (method === 'user') {
      for (let input in data) {
        let id = data[input];

        if (input == user_input) {
          found = true;

          if (id == user_id) {
            return '이전에 인증된 상태 입니다.\n정상적으로 사용하실 수 있습니다.';
          } else if (id === '') {
            let updates = {};
            updates[input] = user_id;
            this.firebase.update('/manager/std_list', updates);
            return '인증되었습니다.\n지금부터 정상적으로 사용할 수 있습니다.';
          } else if (id != user_id) {
            return '해당 학번으로 인증된 계정이 있습니다. \n본인 학번으로 다른 사람이 인증했다면,\n상담직원과 채팅으로 전환한 후 문의해주시기 바랍니다.';
          }
        }

        if (id == user_id && input != user_input) {
          return (
            '다른 학번으로 이미 인증된 상태입니다.\n등록된 학번은 ' +
            input +
            '입니다.\n 다른 학번으로 인증하기 위해서 인증을 해제하고 싶으시다면, "인증 해제"를 입력해주세요.'
          );
        }
      }

      if (!found) {
        return '존재하지 않는 학번입니다.';
      }
    } else if (method === 'check' || method === 'log') {
      let check_id = false;
      for (let input in data) {
        let id = data[input];

        if (id == user_id && !check_id) {
          check_id = true;
          const std_num = input;
          const ref = this.firebase.get('/' + std_num);
          const std_data = ref['data'];
          const keys = Object.keys(std_data['log']);
          if (method == 'check') {
            if (std_data['state'] == '2') {
              return (
                std_num +
                ' ' +
                std_data['name'] +
                '\n상점 : ' +
                String(std_data['plus_point'] + std_data['extra_plus_point']) +
                '\
                      \n벌점 : ' +
                String(
                  std_data['minus_point'] + std_data['extra_minus_point'],
                ) +
                '\n마지막 업데이트 : ' +
                keys[keys.length - 1] +
                '\n퇴사 위험 상태입니다.'
              );
            } else if (std_data['state'] == '1') {
              return (
                std_num +
                ' ' +
                std_data['name'] +
                '\n상점 : ' +
                String(std_data['plus_point'] + std_data['extra_plus_point']) +
                '\
                      \n벌점 : ' +
                String(
                  std_data['minus_point'] + std_data['extra_minus_point'],
                ) +
                '\n마지막 업데이트 : ' +
                keys[keys.length - 1] +
                '\n\n퇴사 시작일 : ' +
                std_data['start_day'] +
                '\n퇴사 종료일 : ' +
                std_data['end_day'] +
                '\n퇴사 상태입니다.'
              );
            } else if (std_data['state'] == '3') {
              return (
                std_num +
                ' ' +
                std_data['name'] +
                '\n상점 : ' +
                String(std_data['plus_point'] + std_data['extra_plus_point']) +
                '\
                      \n벌점 : ' +
                String(
                  std_data['minus_point'] + std_data['extra_minus_point'],
                ) +
                '\n마지막 업데이트 : ' +
                keys[keys.length - 1] +
                '\n\n퇴사 시작일 : ' +
                std_data['start_day'] +
                '\n퇴사 종료일 : ' +
                std_data['end_day'] +
                '\n퇴사 예정자 입니다.'
              );
            } else {
              return (
                std_num +
                ' ' +
                std_data['name'] +
                '\n상점 : ' +
                String(std_data['plus_point'] + std_data['extra_plus_point']) +
                '\
                      \n벌점 : ' +
                String(
                  std_data['minus_point'] + std_data['extra_minus_point'],
                ) +
                '\n마지막 업데이트 : ' +
                keys[keys.length - 1]
              );
            }
          } else if (method === 'log') {
            const lines = [];
            for (const [timestamp, content] of Object.entries(
              std_data['log'],
            )) {
              const [year, month, day] = timestamp.split('-');
              const dateFormatted = `${year}-${month}-${day}`;
              lines.push(`${dateFormatted} - ${content}`);
            }
            lines.reverse();
            return (
              std_num +
              ' ' +
              std_data['name'] +
              '\n 상벌점 기록은 다음과 같습니다.\n' +
              lines.join('\n') +
              '\n마지막 업데이트 : ' +
              keys[keys.length - 1]
            );
          }
        }
      }

      if (!check_id) {
        return '등록되지 않은 사용자 입니다.\n학번을 입력해주세요.';
      }
    } else if (method === 'delete') {
      let updated = false;
      for (let input in data) {
        if (data[input] == user_id) {
          let updates = {};
          updates[input] = '';
          updated = true;
          this.firebase.update('/manager/std_list', updates);
          break;
        }
      }
      if (updated) {
        return '계정 인증이 해제되었습니다. \n 다른 계정으로 인증하려면 학번을 입력해주세요.';
      } else {
        return '이 계정으로 등록된 학번이 없습니다.\n학번을 입력해서 인증해주세요.';
      }
    } else {
      return '오류';
    }
  }
}
