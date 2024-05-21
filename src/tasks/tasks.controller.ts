import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,ParseUUIDPipe,ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getAllTasks(): Promise<Task[]>{
        return this.tasksService.getAllTasks();
    }

    @Get("/:id") 
    getTaskById(@Param("id") id:string ):Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto ): Promise<Task>{

        return this.tasksService.createTask(createTaskDto)
    }

    @Delete("/:id") 
    deleteTask(@Param("id") id:string ): Promise<{message:string , statusCode:string}>{
        return this.tasksService.deleteTask(id)
    }

    @Patch("/:id/status") 
    updateTaskStatus(@Param("id") id:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto ):Promise<Task>{
        const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id,status)
    }

    // @Patch(':id/status')
    // updateStatus(
    //   @Param('id', ParseUUIDPipe) id: string,
    //   @Body('status', ValidationPipe) status: TaskStatus,
    // ): Promise<Task> {
    //   return this.tasksService.updateTaskStatus(id, status);
    // }

}
