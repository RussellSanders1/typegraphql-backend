import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {IsEmail, IsPhoneNumber, MaxLength} from 'class-validator';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {Capstone} from './Capstone';
import {Proposal} from './Proposal';
import {User} from './User';

@ObjectType({description: 'Department model'})
export class Department {

    //fields
    @Field()
    @Prop({required: true})
    name: string;

    @Field()
    @Prop({required: false})
    url: string;

    @Field()
    @Prop({required: false})
    @IsEmail()
    email: string;

    // TODO: thumbnail, cover

    @Field()
    @Prop({required: true})
    @MaxLength(10000)
    description: string;

    @Field()
    @Prop({required: false})
    @IsPhoneNumber('US')
    phone: string;

    @Field()
    @Prop({required: true})
    @MaxLength(500)
    preview: string;

    //Refs
    @Field(() => [Capstone])
    @Prop({required: false})
    capstones: Ref<Capstone>[];

    @Field(() => [User])
    @Prop({required: true})
    professors: Ref<User>[];

    @Field(() => [Proposal])
    @Prop({required: false})
    proposals: Ref<Proposal>[];
}

export const DepartmentModel = getModelForClass(Department);