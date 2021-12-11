import { Injectable, Logger } from '@nestjs/common';
import { ContactMessageDto } from './dto/contact-message.dto';
import * as NodeMailer from 'nodemailer';
import * as config from 'config';

@Injectable()
export class ContactService {
  private logger = new Logger('ContactService');

  createContactMessage(contactMessageDto: ContactMessageDto): void {
    const mailerConfig = config.get('nodemailer');

    const transporter = NodeMailer.createTransport({
      service: mailerConfig.service,
      auth: {
        user: mailerConfig.user,
        pass: mailerConfig.password,
      },
    });

    const mailOptions = {
      from: 'Blyberg.net Website <website@home.blyberg.net>',
      to: 'john@blyberg.net',
      subject: 'New website contact message: ' + contactMessageDto.subject,
      html: `
      <h3>Website message from ${contactMessageDto.name} (${contactMessageDto.email})</h3>
      <p>${contactMessageDto.message}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error(`Failed to send message. Error: ${error.message}`);
      } else {
        this.logger.verbose(info);
      }
    });
  }
}
