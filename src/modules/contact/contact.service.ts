import { Injectable } from '@nestjs/common';
import { ContactMessageDto } from './dto/contact-message.dto';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class ContactService {
  async createContactMessage(contactMessageDto: ContactMessageDto) {
    // Do mailgun stuff
    const api_key = '';
    const domain = '';
    const ConstructorParams = { apiKey: api_key, domain: domain };

    const mailgun = new Mailgun(ConstructorParams);

    const data = {
      from: `${contactMessageDto.name} ${contactMessageDto.email}`,
      to: 'john@blyberg.net',
      subject: 'Hello, testing!',
      text: 'Testing some Mailgun awesomness!',
    };
    mailgun.messages().send(data, (error, body) => {
      console.log(body);
      return 'Message sent';
    });
  }
}
