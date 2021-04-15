import fs from 'fs';
import {basename,} from 'path';
import {Permission, PermissionModel,} from '../models/Permission';
import {DefaultRolePermissions, PermissionObject, RoleModel} from '../models/Role';
import {DocumentType} from '@typegoose/typegoose';

const generatePermissionsForFile = async (fullPath: string, role: PermissionObject) => {
  
  if(!fs.statSync(fullPath).isDirectory()) {
    const name = basename(fullPath, '.ts');

    const perm = await (await PermissionModel.create({
      collectionName: name, //collectionName 
      create: role.create, //create
      read: role.read, //read
      update: role.update, //update
      delete: role.delete //delete
    })).save();

    console.log({perm});
    return perm;
  }
};

export const generateRoles = async () => {
  const generateRolesForDirectory = async (directory: string) => {
    for(const role of DefaultRolePermissions){
      const newRole = await RoleModel.findOne({name: role.name});
      let perms: Promise<DocumentType<Permission> | undefined>[] = [];
      for( const file of fs.readdirSync(directory)){ 
        const fullPath = `${directory}/${file}`;
        const newPerm = generatePermissionsForFile(fullPath, role);
        // console.log({newPerm});
        if(newPerm){
          perms = perms.concat(newPerm); 
        }
      }
      
      if(newRole){
        //update existing roles
        const toSave = await RoleModel.findByIdAndUpdate(newRole._id, {
          name: role.name, 
          permissionIDs: (await Promise.all(perms)).map(p => p?._id)
        });
        if(toSave){
          toSave.save();
        }
      }else {
        //create new roles
        const toSave = await RoleModel.create({
          name: role.name, 
          permissions: perms
        });
        if(toSave){
          toSave.save();
        }
      }
    }
  };
  await generateRolesForDirectory('./src/models/');
};