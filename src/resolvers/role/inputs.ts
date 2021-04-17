import {Ref} from '@typegoose/typegoose';
import {Length} from 'class-validator';
import {GraphQLInputObjectType} from 'graphql';
import {Field, InputType} from 'type-graphql';
import {Permission} from '../../models/Permission';
import {Role} from '../../models/Role';
import {PermissionInput} from '../permission/inputs';

@InputType()
export class CreateRoleInput{
    @Field()
    name: string;

    @Field(() => [PermissionInput])
    permissions: PermissionInput[];

}

@InputType()
export class UpdateRoleInput{

    @Field()
    name: string;
    
    @Field(() => [PermissionInput])
    permissions: PermissionInput[];
}