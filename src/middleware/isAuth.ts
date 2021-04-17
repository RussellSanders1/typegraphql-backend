import {User, UserModel} from '../models/User';
import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '@contexts/MyContext';
import {DocumentType, isRefType} from '@typegoose/typegoose';
import {Role, RoleModel} from '@models/Role';
import {Permission} from '@models/Permission';

export enum Operation{
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}


export function isAuth(collectionName: string, operations: Operation[]): MiddlewareFn<MyContext>{
  return async ({context, args, root, info}, next) => {
    const id = context.req.session.userID;
    if (!id) {
      throw new Error('Not authenticated');
    }
    
    //get user
    const user = await UserModel.findById(id);
    console.log({user});
    if(!user){
      throw new Error('User does not exist');
    } 
    
    //resolve user's role
    const role = user.role as Role;

    const permsFromRole = role!.permissions as Permission[];

    //resolve permission to check from collectionName
    let permissionToCheck: Permission | null = null;
    for await (const perm of permsFromRole){
      if(perm?.collectionName === collectionName){
        permissionToCheck = perm;
        break;
      }
    }

    console.log(permissionToCheck!);
    //fail fast if null or false on ANY operation
    for(const operation of operations){
      if(!permissionToCheck || (!permissionToCheck[operation])){
        throw new Error(`Not Authorized to perform ${operation} operation on ${collectionName}`);
      }
    }
    

    return next();
  };
}
