import {Field, InputType} from 'type-graphql';
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