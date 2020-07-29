import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { Expose } from 'class-transformer';

export class Todo extends BaseModel {
    @prop({ required: [true, 'Title is required'] })
    @Expose()
    title: string;
    
    @prop()
    @Expose()
    description: string;

    @prop({ default: false })
    @Expose()
    isCompleted: boolean;

    static get model(): ModelType<Todo> {
        return new Todo().getModelForClass(Todo, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<Todo> {
        return new this.model();
    }
}