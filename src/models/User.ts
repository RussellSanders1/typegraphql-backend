import {getModelForClass, prop as Prop, DocumentType} from '@typegoose/typegoose';
import {IsEmail} from 'class-validator';
import {generateToken} from '../resolvers/user/helpers';
import {Field, ID, Int, ObjectType, Root, } from 'type-graphql';
import {Role, RoleModel} from './Role';
import {Ref} from '../types/Ref';
import {ObjectId} from 'mongoose';


@ObjectType({ description: 'User model'})
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({required: true})
    firstName: string;

    @Field()
    @Prop({required: true})
    lastName: string;

    @Field()
    name(@Root() parent: any): string{
      return `${parent.firstName} ${parent.lastName}`;
    }

    @Field()
    @Prop({required: true, unique: true})
    @IsEmail()
    email: string;

    @Prop({requierd: true})
    password: string;

    @Field()
    @Prop({required: true})
    createdAt: Date;

    @Field(() => Role)
    @Prop({required: true, type: () => [Role]}) 
    role: Ref<Role>;

  // @Field()
  // token?(): string{
  //   return generateToken(this);
  // }
}

export const UserModel = getModelForClass(User);