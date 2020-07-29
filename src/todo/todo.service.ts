import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper/mapper.service';
import { Todo } from './models/todo.models';
import { TodoParams } from './models/view-models/todo-params.model';

@Injectable()
export class TodoService extends BaseService<Todo> {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Todo.modelName) private readonly _todoModel: ModelType<Todo>,
        private readonly _mapperService: MapperService,
    ) {
        super();
        this._model = _todoModel;
        this._mapper = _mapperService.mapper;
    }

    async createTodo(params: TodoParams): Promise<Todo> {
        const { title, description } = params;

         const newTodo = Todo.createModel();
     

        newTodo.title = title;
        newTodo.description = description;
       
        

        

        try {
            const result = new this._todoModel(newTodo)
            const data = await result.save();
            console.log("res"+data)
             return data
            
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}