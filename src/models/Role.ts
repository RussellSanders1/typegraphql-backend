import {getModelForClass, prop as Prop } from '@typegoose/typegoose';
import {Field, ID, Int, ObjectType, } from 'type-graphql';
import {Permission} from './Permission';
import {Ref} from '../types/Ref';

// export enum DefaultRole {
//     Public = 'Public',
//     Admin = 'admin'
// }

export interface PermissionObject {
    name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}


export const DefaultRolePermissions: PermissionObject[] = [
  {
    name: 'Admin',
    create: true,
    read: true,
    update: true,
    delete: true
  },
  {
    name: 'Public',
    create: false,
    read: true,
    update: false,
    delete: false
  },
];

@ObjectType({ description: 'Permission model'})
export class Role {

    @Field()
    @Prop({required: true})
    name: string;

    @Field(() => [Permission])
    @Prop({required: false})
    permissions: Ref<Permission>[];
    
}

export const RoleModel = getModelForClass(Role);