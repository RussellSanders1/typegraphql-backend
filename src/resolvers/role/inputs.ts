import {Length} from 'class-validator';
import {GraphQLInputObjectType} from 'graphql';
import {Field, InputType} from 'type-graphql';
import {Permission} from '../../models/Permission';
import {Role} from '../../models/Role';

@InputType()
export class CreateRoleInput {
    @Field()
    name: string;
}

@InputType()
export class UpdateRoleInput implements Partial<Role> {

    @Field()
    name: string;
    
    @Field(() => [Permission])
    permissions: Permission[];
}