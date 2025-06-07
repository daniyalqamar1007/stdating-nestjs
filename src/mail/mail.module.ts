import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'daniyalqamar1007@gmail.com',
          pass: 'omsz wbsy wgdf ubqi',
        },
      },
      defaults: {
        from: '"St-Dating " <no-reply@afsrealestate.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
