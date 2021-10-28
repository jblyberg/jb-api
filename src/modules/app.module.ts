import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { CardsModule } from './cards/cards.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CardsModule, ContactModule],
})
export class AppModule {}
