import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';
import { ContractorsModule } from './contractors/contractors.module';
import { PersistenceModule } from './persistence/persistence.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailService } from './mail/mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
            user: process.env.MAIL_API_USER,
            pass: process.env.MAIL_API_PASS
        }
      },
      defaults: {
        from: '"LeanCon Email Dienst" <service@leancon.de>',
      },
      template: {
        dir: join(__dirname, '..', 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist')
    }),
    ScheduleModule.forRoot(),
    ProjectsModule,
    ContractorsModule,
    PersistenceModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
