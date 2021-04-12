import { InputType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import {User} from 'models/User';

@InputType()
export class LoginInput implements Partial<User> {

    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
export class RegisterInput implements Partial<User> {

    @Field()
    username: string;

    @Field()
    @IsEmail()
    email: string;
    
    @Field()
    password: string;

    @Field()
    confirmPassword: string;
}