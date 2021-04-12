import jwt from 'jsonwebtoken';
import {SECRET_KEY} from 'config';
import { Resolver, Mutation, Arg, Query} from 'type-graphql';
import {User, UserModel} from 'models/User';
import {LoginInput, RegisterInput} from './inputs';
import {validateRegisterInput, validateLoginInput} from 'util/validators';
import {UserInputError} from 'apollo-server';
import bcrypt from 'bcryptjs';
import {RoleModel} from 'models/Role.js';
const generateToken = (user: Partial<User>) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, SECRET_KEY, {expiresIn: '1h'});
};

interface UserReturn extends User {
  token: string
}

@Resolver(() => User)
export class UserResolver {

  @Query(() => User, {nullable: true})
  public async findOne(@Arg('id') id: string): Promise<User | null>{
    return await UserModel.findById(id);
  }


  @Mutation(() => User, {nullable: true})
  async register(@Arg('registerInput') registerInput: RegisterInput): Promise<UserReturn> {
    const {username, email, confirmPassword} = registerInput;
    let {password} = registerInput;

    // TODO: validate user data
    const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
    if(!valid){
      throw new UserInputError('Errors', {errors});
    }

    const user = await UserModel.findOne({username});
    if(user){
      throw new UserInputError('Username taken', {
        errors: {
          username: 'This username is taken'
        }
      });
    }

    password = await bcrypt.hash(password, 12);
    
    //assign public role by default
    const role = await RoleModel.find({type: 'public'});

    const newUser = await UserModel.create({
      email,
      username,
      password,
      createdAt: new Date(),
      role
    });
    console.log({newUser});

    const response = await newUser.save();
    const token = generateToken(newUser);
    
    return {
      ...response,
      token
    };
  }

  @Mutation(() => User, {nullable: true})
  async login(@Arg('loginInput') loginInput: LoginInput): Promise<UserReturn> {
    const {username, password} = loginInput;
    const {errors, valid} = validateLoginInput(username, password);

    if(!valid){
      throw new UserInputError('Errors', {errors});
    }

    const user = await UserModel.findOne({username});
    if(!user){
      errors.general = 'User not found';
      throw new UserInputError('User not found', {errors});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
      errors.general = 'Wrong credentials';
      throw new UserInputError('Wrong credentials', {errors});
    }

    const token = generateToken(user);

    return {
      ...user,
      token 
    };
  }
}