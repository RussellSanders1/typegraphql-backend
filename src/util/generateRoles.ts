import fs from 'fs';
import {basename,} from 'path';
import {Permission, PermissionModel,} from '../models/Permission';
import {DefaultRolePermissions, PermissionObject, RoleModel} from '../models/Role';
import {DocumentType} from '@typegoose/typegoose';

const generatePermissionsForFile = async (name: string, role: PermissionObject): Promise<DocumentType<Permission>> => {
  const perm = await PermissionModel.create({
    collectionName: name, //collectionName 
    create: role.create, //create
    read: role.read, //read
    update: role.update, //update
    delete: role.delete //delete
  });

  return perm;
};

export const generateRoles = async () => {
  const generateRolesForDirectory = async (directory: string) => {
    for(const role of DefaultRolePermissions){
      
      //find role by name
      const existingRole = await RoleModel.findOne({name: role.name});

      //collect permissions from existing role
      let perms: Permission[] = existingRole ? existingRole.permissions as Permission[] : [];
      
  
      for( const file of fs.readdirSync(directory)){ 
        const fullPath = `${directory}/${file}`;
        const name = basename(fullPath, '.ts');
        if(!fs.statSync(fullPath).isDirectory()){

          //if no existing permissions or the permissions
          //don't contain an entry for the collection
          if(!perms.length || !perms.map((perm) => perm.collectionName).includes(name)){
            const newPerm = await PermissionModel.create({
              collectionName: name, //collectionName 
              create: role.create, //create
              read: role.read, //read
              update: role.update, //update
              delete: role.delete //delete
            });
            if(newPerm){
              perms = perms.concat(newPerm); 
            }
          }
        }
      }
      if(existingRole){
        //update existing roles
        const toSave = await RoleModel.findByIdAndUpdate(existingRole._id, {
          name: role.name, 
          permissions: perms,
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