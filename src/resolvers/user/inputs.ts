import { InputType, Field } from 'type-graphql';
import { Equals, IsEmail, Length, MinLength } from 'class-validator';
import {User} from '../../models/User';
import {Match} from '../../util/validators/MatchValidator';
import {IsEmailUnique} from './validators/EmailValidator';
import {Role} from '../../models/Role';
import {Ref} from '../../types/Ref';

@InputType()
export class LoginInput implements Partial<User> {

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(1)
    password: string;
}

@InputType()
export class RegisterInput implements Partial<User> {

    @Field()
    @Length(1,255)
    firstName: string;
    
    @Field()
    @Length(1,255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailUnique()
    email: string;
    
    @Field()
    @MinLength(1)
    password: string;

    @Field()
    @Match('password')
    confirmPassword: string;
}

@InputType()
export class UpdateUserDataInput {
    @Field({nullable: true})
    @Length(1,255)
    firstName?: string;
    
    @Field({nullable: true})
    @Length(1,255)
    lastName?: string;

    @Field({nullable: true})
    @IsEmail()
    @IsEmailUnique()
    email?: string;
}

@InputType()
export class UpdateUserRoleInput {
    @Field()
    role: string;
}
