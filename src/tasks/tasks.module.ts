import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import {Task} from "./task.entity"
import { AuthModule } from 'src/auth/auth.module';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task]),AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService,TasksGateway],
})
export class TasksModule {}
