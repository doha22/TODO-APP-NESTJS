import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
// import { UserRole } from './user-role.enum';
import { Expose } from 'class-transformer';

export class User extends BaseModel {
    @prop({
        required: [true, 'Username is required'],
        unique: true
       
    })
    @Expose()
    username: string;

    @prop()
    @Expose()
    firstName?: string;

    @prop()
    @Expose()
    lastName?: string;


    @prop({
        required: [true, 'Password is required'],
        minlength: [3, 'Must be at least 3 characters'],
    })
    @Expose()
    password: string;



    // @prop({ enum: UserRole, default: UserRole.User })
    // @Expose()
    // role?: UserRole;


    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<User> {
        return new this.model();
    }
}