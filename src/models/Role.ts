import {getModelForClass, prop as Prop } from '@typegoose/typegoose';
import {Field, ID, Int, ObjectType, Root, } from 'type-graphql';
import {Permission, PermissionModel} from './Permission';
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

@ObjectType({ description: 'Role model'})
export class Role {

    @Field()
    @Prop({required: true})
    name: string;

    @Prop({required: false})
    permissionIDs: Ref<Permission>[];

    @Field(() => [Permission])
    async permissions(@Root() role: any) {
      const permissionArr= [];
      for(const id of role.permissionIDs){
        permissionArr.push(PermissionModel.findById(id));
      }
      return Promise.all(permissionArr);
    }
    
}

export const RoleModel = getModelForClass(Role);