import {getModelForClass, prop as Prop, DocumentType, Ref, plugin} from '@typegoose/typegoose';
import {IsEmail} from 'class-validator';
import {Field, ID, ObjectType, Root, } from 'type-graphql';
import {Role} from './Role';
import autopopulate from 'mongoose-autopopulate';

@ObjectType({ description: 'User model'})
@plugin(autopopulate)
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
    @Prop({ref: () => Role, autopopulate: true}) 
    role: Ref<Role>;

}


export const UserModel = getModelForClass(User, {schemaOptions: {timestamps: true}});