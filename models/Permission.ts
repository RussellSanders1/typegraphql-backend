import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {Role} from './Role';
@ObjectType({description: 'Permission model'})
export class Permission {

    @Field()
    @Prop({required: true})
    type: string;

    @Field()
    @Prop({required: true})
    controller: string;

    @Field()
    @Prop({required: true})
    action: string;

    @Field()
    @Prop({required: true})
    enabled: boolean;

    @Field()
    @Prop({required: true})
    policy: string;

    @Field(() => Role)
    @Prop({required: true})
    role: Ref<Role>;
}

export const PermissionModel = getModelForClass(Permission);