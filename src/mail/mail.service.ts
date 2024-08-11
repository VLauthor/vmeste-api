import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfService } from '../config/configuration.service';
import * as nodemailer from 'nodemailer';
import { MailAttachments, MailMassage } from '../objects/interfaces';
const path = require('path');

import ejs from 'ejs';
@Injectable()
export class MailService {
  constructor(private config: ConfService) {}
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
  private send = async (message: MailMassage) => {
    const result = await new Promise((resolve, reject) => {
      this.transporter.sendMail(message, (err: Error) => {
        if (err) {
          console.log(err);
          return reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'mail could not be sent',
          });
        }
        return resolve({ statusCode: HttpStatus.CREATED, data: 'email sent' });
      });
    });
    return result;
  };
  public sendCode = async (mail: string, code: string) => {
    const logoPath = path.join(__dirname, '../../public/image/logo.png');
    const mailPath = path.join(__dirname, '../../public/views/mail.ejs');
    const html = await ejs.renderFile(mailPath, {
      c1: code[0],
      c2: code[1],
      c3: code[2],
      c4: code[3],
      c5: code[4],
      c6: code[5],
    });
    const image: MailAttachments = {
      filename: 'image.png',
      path: logoPath,
      cid: 'unique@image.cid',
    };
    const message: MailMassage = {
      from: `Anjelica VL < ${this.config.returnMailHostUserConfig()}> `,
      to: mail,
      subject: 'Код восстановления пароля',
      html: html,
      attachments: [image],
    };
    return await this.send(message);
  };
}
