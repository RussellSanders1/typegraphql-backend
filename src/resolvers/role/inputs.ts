import {Length} from 'class-validator';
import {GraphQLInputObjectType} from 'graphql';
import {Field, InputType} from 'type-graphql';
import {Permission} from '../../models/Permission';
import {Role} from '../../models/Role';
import {PermissionInput} from '../permission/inputs';

@InputType()
export class CreateRoleInput implements Partial<Role>{
    @Field()
    name: string;

    @Field(() => [PermissionInput])
    permissions: PermissionInput[];

}

@InputType()
export class UpdateRoleInput implements Partial<Role> {

    @Field()
    name?: string;
    
    @Field(() => [PermissionInput])
    permissions?: PermissionInput[];
}