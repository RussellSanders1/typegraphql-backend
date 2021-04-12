import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {Permission} from './Permission';
import {User} from './User';

@ObjectType({description: 'Role model'})
export class Role {
    @Field()
    @Prop({required: true})
    name: string;

    @Field()
    @Prop({required: true})
    description: string;
    
    @Field()
    @Prop({required: true})
    type: string;

    @Field(() => [Permission])
    @Prop({required: true})
    permissions: Ref<Permission>[];

    @Field(() => [User])
    @Prop({required: false})
    users: Ref<User>[];
}

export const RoleModel = getModelForClass(Role);