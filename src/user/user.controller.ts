import { Controller, Post, Body, Get, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { join } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async checkUser(
    @Session() session: Record<string, any>,
    @Body('name') name: string,
    @Body('pw') password: string,
    @Res() res: Response,
  ): Promise<void> {
    var state = await this.userService.checkuser(name, password);
    if (state === 1) {
      session.user = {
        manager_name: name,
      };
      res.render('point_layout', { display: false });
    } else if (state === 2) {
      session.user = {
        manager_name: 'master',
      };
      res.render('point_layout', { display: true });
    } else if (state === 0) {
      return res.redirect('/');
    } else {
      const filePath = join(__dirname, '..', '..', 'public', 'err404.html');
      return res.sendFile(filePath);
    }
  }

  @Get()
  checkAuth(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ): void {
    const Auth = session?.user?.manager_name;
    var state = this.userService.checkAuth(Auth);
    if (state === 1) {
      res.render('point_layout', { display: false });
    } else if (state === 2) {
      res.render('point_layout', { display: true });
    } else if (state === 0) {
      return res.redirect('/');
    } else {
      const filePath = join(__dirname, '..', '..', 'public', 'err404.html');
      return res.sendFile(filePath);
    }
  }

  @Post('change')
  async changePW(
    @Session() session: Record<string, any>,
    @Body('password') pw: string,
    @Res() res: Response,
  ) {
    if (session.user?.manager_name) {
      const result = await this.userService.change(
        session.user.manager_name,
        pw,
      );
      return res.status(result.status).json({ message: result.message });
    } else {
      const filePath = join(__dirname, '..', '..', 'public', 'err404.html');
      return res.sendFile(filePath);
    }
  }
}
