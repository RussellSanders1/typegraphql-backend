import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {IsEmail, MaxLength} from 'class-validator';
import {Field, ID, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {Role} from './Role';
import {Department} from './Department';
import {Capstone} from './Capstone';
import {Sponsor} from './Sponsor';

@ObjectType({ description: 'User model'})
export class User {
    
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({required: true})
    username: string;

    @Field()
    @Prop({required: true})
    @IsEmail()
    email: string;

    @Field()
    @Prop()
    provider: string;

    @Field()
    @Prop({requierd: true})
    password: string;

    @Field()
    @Prop()
    resetPasswordToken: string;

    @Field()
    @Prop()
    confirmed: boolean;

    @Field()
    @Prop()
    blocked: boolean;

    @Field()
    @Prop()
    fullname: string;

    @Field()
    @Prop()
    @MaxLength(10000)
    description: string;

    @Field()
    @Prop({required: true})
    createdAt: Date;

    // TODO: photos?

    //Refs
    @Field(() => Role)
    @Prop({required: true})
    role: Ref<Role>;

    @Field(() => [Capstone])
    @Prop({ref: Capstone})
    capstones: Ref<Capstone>[];

    @Field(() => Sponsor)
    @Prop({ref: Sponsor})
    organization: Ref<Sponsor>;

    @Field(() => Department)
    @Prop({ref: Department})
    department: Ref<Department>;
}

export const UserModel = getModelForClass(User);