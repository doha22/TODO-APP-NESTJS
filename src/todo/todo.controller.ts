import {Body,Controller,Delete,Get,HttpException,HttpStatus,InternalServerErrorException,Param,Post,Put,Query,  
} 
from '@nestjs/common';
// for creating api
import {ApiBadRequestResponse,
    ApiBearerAuth,ApiCreatedResponse,
    ApiOkResponse,
  
}
 from '@nestjs/swagger';
import { isArray, map } from 'lodash';
import { ApiException } from '../shared/api-exception.model';

import { Todo } from './models/todo.models';
import { TodoParams } from './models/view-models/todo-params.model';
import { TodoVm } from './models/view-models/todo-vm.model';
import { TodoService } from './todo.service';

import {UserService} from  '../user/user.service';



@Controller('todos')
@ApiBearerAuth('Authorization')
export class TodoController {
    constructor(private readonly _todoService: TodoService) {
       
    }

    @Post()
    @ApiCreatedResponse({ status:HttpStatus.CREATED ,type: TodoVm })
    @ApiBadRequestResponse({ status:HttpStatus.BAD_REQUEST ,type: ApiException })
    async create(@Body() params: TodoParams): Promise<TodoVm> {
        try {
            const newTodo = await this._todoService.createTodo(params);
            console.log("newTodo : "+newTodo);
             if(!newTodo){ throw new HttpException('Some thing went wrong during creating task', HttpStatus.BAD_REQUEST); }
              console.log("created")
             this._todoService.map(newTodo, Todo, TodoVm);
             return newTodo
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @ApiOkResponse({status:HttpStatus.OK , type: TodoVm, isArray: true })
    @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST , type: ApiException })

    async get() {
        try {
            const todos = await this._todoService.findAll();
            this._todoService.map(todos, Todo, TodoVm); 
            if(!todos){ throw new HttpException('Some thing went wrong during creating user', HttpStatus.BAD_REQUEST); }
            console.log("task created")
            return this._todoService.mapArray(map(todos, todo => todo), Todo, TodoVm);
        
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    @ApiOkResponse({ status:HttpStatus.CREATED ,type: TodoVm })
    @ApiBadRequestResponse({ status:HttpStatus.BAD_REQUEST ,type: ApiException })

    async update(@Body() vm: TodoVm): Promise<TodoVm> {
        const { id, title, description, isCompleted } = vm;
        const exist = await this._todoService.findById(id);
        console.log("id = "+exist)

        if (!exist) {
            throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
        }

        if (exist.isCompleted) {
            throw new HttpException('Already completed', HttpStatus.BAD_REQUEST);
        }

        exist.title = title;
        exist.isCompleted = isCompleted;
        exist.description = description;

        try {
            const updated = await this._todoService.findOne();
            return this._todoService.map(updated, Todo, TodoVm);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOkResponse({ status:HttpStatus.OK ,type: TodoVm })
    @ApiBadRequestResponse({ status:HttpStatus.OK ,type: ApiException })
    async delete(@Param('id') id: string): Promise<TodoVm> {
        try {
            const deleted = await this._todoService.delete(id);
            return this._todoService.map(deleted, Todo, TodoVm);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}

export function EnumToArray(enumVariable: any): string[] {
    return Object.keys(enumVariable).map(k => enumVariable[k]);
}