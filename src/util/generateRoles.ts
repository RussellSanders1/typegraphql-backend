import fs from 'fs';
import {basename,} from 'path';
import {Permission, PermissionModel,} from '../models/Permission';
import {DefaultRolePermissions, PermissionObject, RoleModel} from '../models/Role';
import {DocumentType} from '@typegoose/typegoose';

const generatePermissionsForFile = async (fullPath: string, role: PermissionObject): Promise<DocumentType<Permission>> => {
  
  const name = basename(fullPath, '.ts');

  const perm = await (await PermissionModel.create({
    collectionName: name, //collectionName 
    create: role.create, //create
    read: role.read, //read
    update: role.update, //update
    delete: role.delete //delete
  })).save();

  return perm;
};

export const generateRoles = async () => {
  const generateRolesForDirectory = async (directory: string) => {
    for(const role of DefaultRolePermissions){
      const existingRole = await RoleModel.findOne({name: role.name});
      let perms: Promise<DocumentType<Permission>>[] = [];
      for( const file of fs.readdirSync(directory)){ 
        const fullPath = `${directory}/${file}`;
        if(!fs.statSync(fullPath).isDirectory()){
          const newPerm = generatePermissionsForFile(fullPath, role);
          if(newPerm){
            perms = perms.concat(newPerm); 
          }
        }
      }
      const resolvedPerms = await Promise.all(perms);
      if(existingRole){
        //update existing roles
        const toSave = await RoleModel.findByIdAndUpdate(existingRole._id, {
          name: role.name, 
          permissions: resolvedPerms
        });
        if(toSave){
          toSave.save();
        }
      }else {
        //create new roles
        const toSave = await RoleModel.create({
          name: role.name, 
          permissions: resolvedPerms
        });
        if(toSave){
          toSave.save();
        }
      }
    }
  };
  await generateRolesForDirectory('./src/models/');
};