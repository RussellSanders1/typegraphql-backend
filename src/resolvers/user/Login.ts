
import { Resolver, Mutation, Arg, Ctx} from 'type-graphql';
import {User, UserModel} from '../../models/User';
import {LoginInput} from './inputs';
import {UserInputError} from 'apollo-server';
import bcrypt from 'bcryptjs';
import {MyContext} from '../../types/MyContext';

@Resolver(() => User)
export class LoginResolver{

  @Mutation(() => User, {nullable: true})
  async login(@Arg('loginInput') loginInput: LoginInput, @Ctx() ctx: MyContext): Promise<User> {
    const {email, password} = loginInput;
    
    const errors: Record<string,string> = {};
    const user = await UserModel.findOne({email});
    if(!user){
      errors.general = 'User not found';
      throw new UserInputError('User not found', {errors});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
      errors.general = 'Wrong credentials';
      throw new UserInputError('Wrong credentials', {errors});
    }

    ctx.req.session.userID = user.id;

    return user;
  }
}