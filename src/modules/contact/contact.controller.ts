import { Controller, Logger, UsePipes, ValidationPipe, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessageDto } from './dto/contact-message.dto';

@Controller('contact')
export class ContactController {
  private logger = new Logger('ContactController');

  constructor(private contactService: ContactService) {}

  @Post('/submit')
  @UsePipes(
    new ValidationPipe({
      disableErrorMessages: true,
    })
  )
  createContactMessage(@Body() contactMessageDto: ContactMessageDto) {
    this.logger.verbose(
      `User "${contactMessageDto.email}" sending a contact message. Data: ${JSON.stringify(contactMessageDto)}`
    );
    return this.contactService.createContactMessage(contactMessageDto);
  }
}
