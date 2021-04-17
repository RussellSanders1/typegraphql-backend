
import { Resolver, Mutation, Arg} from 'type-graphql';
import {User, UserModel} from '@models/User';
import {RegisterInput} from './inputs';
import {UserInputError} from 'apollo-server';
import bcrypt from 'bcryptjs';
import {RoleModel} from '@models/Role';
import {UserResolver} from './UserCrud';

@Resolver(() => User)
export class RegisterResolver{

  @Mutation(() => User, {nullable: true})
  async register(@Arg('registerInput') registerInput: RegisterInput): Promise<User> {
    const {firstName, lastName, email} = registerInput;
    let {password} = registerInput;


    const user = await UserModel.findOne({email});
    if(user){
      throw new UserInputError('Username taken', {
        errors: {
          username: 'This email already exists'
        }
      });
    }

    password = await bcrypt.hash(password, 12);

    const publicRole = await RoleModel.findOne({name: 'Public'});
    if(!publicRole){
      throw new Error('Server setup failed, no public role exists');
    }

    const newUser = (await UserModel.create({
      email,
      firstName,
      lastName,
      password,
      createdAt: new Date(),
      role: publicRole
    })).save();

    return newUser;
  }
  
}