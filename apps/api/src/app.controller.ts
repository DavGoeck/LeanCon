import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('projects')
  retrieveProjects(): Project[] {
    return this.appService.retrieveProjects()
  }

  @Post('project')
  createProject(@Body('title') title: string): Project[] {
    return this.appService.createProject(title)
  }

  @Delete('project')
  deleteProjects(@Body('id') title: string): Project[] {
    return this.appService.deleteProject(title);
  }
}
