import { Injectable, NotFoundException } from '@nestjs/common';
import {TaskStatus} from "./task-status-enum";

import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './task.entity';
import {  Repository } from "typeorm";
import { TasksGateway } from './tasks.gateway';

    @Injectable()
    export class TasksService {

        constructor(
            @InjectRepository(Task)
            private taskRepository:Repository<Task>,
            private tasksGateway: TasksGateway,
        ){}
    

        async getTaskById(id:string): Promise< Task>{
            const found = await this.taskRepository.findOne({ where: { id } });
                if(!found){
                throw new NotFoundException(`Task with ${id} does not exist`);
            }

            return found

        }

        async getAllTasks(): Promise<Task[]> {

            return this.taskRepository.find();
       
       }
    

        async  createTask(createTaskDto:CreateTaskDto): Promise<Task>{
            const {title, description} = createTaskDto

        const task = this.taskRepository.create({
            title,
            description,
            status:TaskStatus.OPEN
        })
            
        await this.taskRepository.save(task)

        this.tasksGateway.emitTaskCreated(task);

        return task
        }

        async  deleteTask(id:string): Promise<{message:string , statusCode:string}>{
        const result = await this.taskRepository.delete(id)

        if(result.affected === 0){
            throw new NotFoundException(`Task with ${id} not found`);
        }
        this.tasksGateway.emitTaskDeleted(id);

        return {message:`You have successfully deleted task with id ${id} `,statusCode:"200"}
    }

       async  updateTaskStatus(id:string, status:TaskStatus): Promise<Task>{
            const task =await  this.getTaskById(id)
            task.status = status;

            await this.taskRepository.save(task)
            this.tasksGateway.emitTaskUpdated(task);
            return task
       
     }
        
        }





