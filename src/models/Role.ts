import {getModelForClass, plugin, prop as Prop, Ref } from '@typegoose/typegoose';
import {Field, ID, ObjectType, } from 'type-graphql';
import {Permission} from './Permission';
import autopopulate from 'mongoose-autopopulate';

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
@plugin(autopopulate)
export class Role {
    @Field(() => ID)
    id: string;
    
    @Field()
    @Prop({required: true})
    name: string;

    @Field(() => [Permission])
    @Prop({required: true, type: () => [Permission], ref: 'Permission', autopopulate: true})
    permissions: Ref<Permission>[]; 
    
}

export const RoleModel = getModelForClass(Role);