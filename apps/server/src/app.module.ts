import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';
import { ContractorsModule } from './contractors/contractors.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist')
    }),
    ProjectsModule,
    ContractorsModule,
    PersistenceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
