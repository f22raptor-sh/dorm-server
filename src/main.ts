import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as fs from 'fs';
import * as https from 'https';
import { cert } from 'firebase-admin/app';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrpt/54.180.189.44.sslip.io/privkey.pem'),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/letsencrpt/54.180.189.44.sslip.io/fullchain.pem',
    ),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  app.use(
    session({
      secret: 'AgsjqwebjtAEKmaGdsWEkljHfbqKjwietn', // 비밀 키
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

// 매일 반복해서 퇴사자 인원을 확인 및 화면 구성을 다르게 처리한다. 테스트 안됨.
// cron.schedule("0 0 * * *", () => {
//   const today = new Date();
//   const today_iso = today.toISOString().split("T")[0];
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const date = String(today.getDate()).padStart(2, "0");
//   const hours = String(today.getHours()).padStart(2, "0");
//   const minutes = String(today.getMinutes()).padStart(2, "0");
//   const seconds = String(today.getSeconds()).padStart(2, "0");
//   const day = `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;

//   let s_ref = db.ref("/");
//   updates = {};
//   s_ref.once("value").then((snapshot) => {
//     for (std_number in snapshot.val()) {
//       const start_day = snapshot.val()[std_number]["start_day"];
//       const end_day = snapshot.val()[std_number]["end_day"];
//       if (std_number != "manager") {
//         if (start_day == today_iso) {
//           updates["/" + std_number + "/state"] = 1;
//           updates["/" + std_number + `/log/${day}`] = "* 퇴사 시작";
//         } else if (end_day == today_iso) {
//           updates["/" + std_number + "/state"] = 0;
//           updates["/" + std_number + `/log/${day}`] = "* 퇴사 종료";
//         }
//       }
//     }
//     return s_ref.update(updates).catch((error) => {
//       console.log(error);
//     });
//   });
// });
