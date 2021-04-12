//contains model for navigation routes
//which will be the access points for
//generic pages
import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {Page} from './Page';

@ObjectType({description: 'Route model'})
export class Route {
    @Field()
    @Prop() 
    name: string;

    @Field()
    @Prop()
    slug: string;

    @Field(() => Page)
    @Prop({required: true})
    page: Ref<Page>;
}

export const RouteModel = getModelForClass(Route);