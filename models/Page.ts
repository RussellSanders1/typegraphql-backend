//a collection of components
//to render using the DynamicElements Engine
import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {GraphQLJSONObject} from 'graphql-type-json';
import {Field, ObjectType} from 'type-graphql';

@ObjectType({description: 'Capstone Model'})
export class Page {
    @Field(() => [GraphQLJSONObject])
    @Prop({required: true, default: []})
    components: typeof GraphQLJSONObject[];
}

export const PageModel = getModelForClass(Page);