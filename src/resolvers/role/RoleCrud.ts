import {Resolver} from 'type-graphql';
import {Role, RoleModel} from '../../models/Role';
import {createResolver} from '../BaseCrudResolver';
import {CreateRoleInput, UpdateRoleInput} from './inputs';
import {DocumentType} from '@typegoose/typegoose';
import {PermissionModel} from '@models/Permission';
import {collectionNames} from '@util/collectionNames';

const RoleCrudResolver = createResolver('Role',Role,RoleModel, CreateRoleInput, UpdateRoleInput, []);

@Resolver(() => Role)
export class RoleResolver extends RoleCrudResolver {
  async create(data: CreateRoleInput): Promise<DocumentType<Role>>{
    const {permissions} = data;

    //store all permissions
    for(const perm of permissions){
      if(!collectionNames.includes(perm.collectionName)){
        throw new Error(`Cannot find collection ${perm.collectionName}: Permissions must be targetted toward a colelction`);
      }
    }

    const perms = await Promise.all(permissions.map(perm => PermissionModel.create(perm)));

    //check if role already exists
    const existingRole = await RoleModel.find({name: data.name});
    if(existingRole){
      throw new Error('Role already exists');
    }

    //create and return role
    return RoleModel.create({
      name: data.name,
      permissions: perms
    });
  }
}