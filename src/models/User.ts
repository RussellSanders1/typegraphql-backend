import {getModelForClass, prop as Prop, DocumentType} from '@typegoose/typegoose';
import {IsEmail} from 'class-validator';
import {generateToken} from '../resolvers/user/helpers';
import {Field, ID, Int, ObjectType, Root, } from 'type-graphql';
import {DefaultRole, Role, RoleModel} from './Role';
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

    @Field(() => String)
    @Prop({required: true})
    roleID: ObjectId;

    @Field(() => Role)
    async role(@Root() user: any): Promise<Role | null> {
      return await RoleModel.findById(user.roleID); 
    }

  // @Field()
  // token?(): string{
  //   return generateToken(this);
  // }
}

export const UserModel = getModelForClass(User);