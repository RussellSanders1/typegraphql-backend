import {prop as Prop} from '@typegoose/typegoose';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {Department} from './Department';
import {Page} from './Page';
import {Sponsor} from './Sponsor';
import {User} from './User';

@ObjectType({description: 'Capstone Model'})
export class Capstone {

    //fields
    @Field()
    @Prop({required: true})
    name: string;

    @Field()
    @Prop({required: true})
    startDate: Date;

    @Field()
    @Prop({required: true})
    endDate: Date;

    @Field()
    @Prop({requied: true})
    description: string;

    @Field()
    @Prop({required: true})
    preview: string;

    //TODO: cover, media, thumbnail

    @Field()
    @Prop({required: true})
    course: string;

    @Field()
    @Prop({required: true})
    semester: string;


    //Refs
    @Field(() => Page)
    @Prop({required: true, ref: Page})
    page: Ref<Page>;

    @Field(() => [Sponsor])
    @Prop({required: true})
    sponsors: Ref<Sponsor>[];

    @Field(() => [User])
    @Prop({required: true})
    students: Ref<User>[];
    
    @Field(() => [User])
    @Prop({required: true})
    professors: Ref<User>[];

    @Field(() => [Department])
    @Prop({required: true})
    departments: Ref<Department>[];

}