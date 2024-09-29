import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfService } from '../config/configuration.service';
import * as nodemailer from 'nodemailer';
import { MailMassage } from '../objects/interfaces';
import { render } from '@react-email/render';
import { CodeVerified } from './templates/CodeVerified';
const path = require('path');

import ejs from 'ejs';
@Injectable()
export class MailService {
  constructor(private config: ConfService) { }
  private transporter = nodemailer.createTransport(
    {
      host: this.config.returnMailHostConfig(),
      port: this.config.returnMailPortConfig(),
      secure: true,
      auth: {
        user: this.config.returnMailHostUserConfig(),
        pass: this.config.returnMailPasswordConfig(),
      },
      logger: true,
      debug: false,
    },
    {
      from: `Angelica VL <${this.config.returnMailHostUserConfig()}> `,
    },
  );
  public sendCode = async (mail: string, code: string) => {
    const emailHtml = await
      render(<CodeVerified code={code} />);
    const message: MailMassage = {
      from: `Anjelica VL < ${this.config.returnMailHostUserConfig()}> `,
      to: mail,
      subject: 'Код восстановления пароля',
      html: emailHtml,
    };
    await this.transporter.sendMail(message);
  };
}
