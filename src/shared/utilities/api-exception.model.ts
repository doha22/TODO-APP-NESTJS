import { ApiProperty  } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Typegoose, prop } from 'typegoose';
import { Expose } from 'class-transformer';

export class BaseModel extends Typegoose{
  @prop({default:Date.now})
  createdAt?: Date;

  @prop({default:Date.now})
  updatedAt?: Date;

  id?: string;

}
 

export class BaseModelVm {
    @ApiProperty ({ type: String, format: 'date-time' })
    // @Expose()
    createdAt?: Date;

    @ApiProperty ({ type: String, format: 'date-time' })
    // @Expose()
    updatedAt?: Date;

    @ApiProperty () 
    // @Expose()
    id?: string;
}

// export abstract class BaseModel<T> extends Typegoose {
//     @prop()
//     @ApiProperty ({ type: String, format: 'date-time' })
//     @Expose()
//     createdAt: Date;

//     @prop()
//     @ApiProperty ({ type: String, format: 'date-time' })
//     @Expose()
//     updatedAt: Date;

//     @ApiProperty ()
//     @Expose()
//     id: string;
// }

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
};