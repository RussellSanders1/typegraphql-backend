import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';

@ObjectType({description: 'Theme model'})
export class Theme {
    
}

export const ThemeModel = getModelForClass(Theme);