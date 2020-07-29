import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
 import { compare, genSalt, hash } from 'bcryptjs';
import { ModelType } from 'typegoose';
 import { AuthService } from '../shared/auth/auth/auth.service';
 import { JwtPayload } from '../shared/auth/auth/jwt-payload';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper/mapper.service';
import { Configuration } from 'src/shared/configuration/configuration/configuration.enum';
import { User } from './models/user.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { UserVm } from './models/view-models/user-vm.model';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
    ) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }


    
    async register(vm: RegisterVm) {
        const { username, password, firstName, lastName } = vm;

        const newUser = User.createModel();
        newUser.username = username.trim().toLowerCase()
         newUser.firstName = firstName
         newUser.lastName = lastName
        //  newUser.password = password

        

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);
        console.log("hash :"+newUser.password)

        try {
            // const result  = await this.create(newUser)
            const result = new this._userModel(newUser);
            const data = await result.save();
            console.log("res"+data)
             return data
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(vm: LoginVm): Promise<LoginResponseVm> {
        const { username, password } = vm;

        console.log("username : "+vm.username)
      // const user_name = vm.username
      console.log("user: "+username)
        const user = await this._userModel.findOne({ username });
        
        console.log("saved user :"+user)

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

     // const vm_password = vm.password 
        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
    
        };

        const token = await this._authService.signPayload(payload);
        console.log(token)
        
        console.log("before mape : "+user);

       // const userVm: UserVm = await this.map(user, User, UserVm);
        return {
            token,
            user: user,
        };
    }





}