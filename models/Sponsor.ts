import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {IsUrl, MaxLength} from 'class-validator';
import {Field, ID, ObjectType} from 'type-graphql';
import {Ref} from '../types';
import {Capstone} from './Capstone';
import {User} from './User';

@ObjectType({description: 'Sponsor model'})
export class Sponsor {

    @Field(() => User)
    @Prop({required: true})
    user: Ref<User>;

    @Field(() => ID)
    id: string;

    @Field()
    @Prop({required: true})
    name: string;

    @Field()
    @Prop()
    @IsUrl()
    url: string;

    // TODO: logo, thumbnail, cover

    @Field()
    @Prop({required: true})
    @MaxLength(10000)
    description: string;

    @Field()
    @Prop({required: true})
    @MaxLength(500)
    preview: string;

    @Field()
    @Prop({default: false})
    featured: boolean;

    @Field()
    @Prop({default: false})
    verified: boolean;
    
    @Field(() => [User])
    @Prop({ref: User})
    members: Ref<User>[]

    @Field(() => [Capstone])
    @Prop({ref: Capstone})
    capstones: Ref<Capstone>[];
}

export const ProfessorModel = getModelForClass(Sponsor);