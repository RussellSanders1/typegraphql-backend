import fs from 'fs';
import {basename,} from 'path';
import {Permission,} from '../models/Permission';
import {DefaultRolePermissions, PermissionObject, RoleModel} from '../models/Role';

const generatePermissionsForFile = (fullPath: string, role: PermissionObject) => {
  
  if(!fs.statSync(fullPath).isDirectory()) {
    const name = basename(fullPath, '.ts');

    return new Permission(
      name, //collectionName 
      role.create, //create
      role.read, //read
      role.update, //update
      role.delete //delete
    );
    
  }
};

export const generateRoles = async () => {
  const generateRolesForDirectory = async (directory: string) => {
    
    for(const role of DefaultRolePermissions){
      const newRole = await RoleModel.findOne({name: role.name});
      // console.log(newRole);
      if(!newRole){
        let perms: Permission[] = [];
        for( const file of fs.readdirSync(directory)){ 
          const fullPath = `${directory}/${file}`;
          const newPerm = generatePermissionsForFile(fullPath, role);
          // console.log({newPerm});
          if(newPerm){
            perms = perms.concat(newPerm); 
          }
        }
        // console.log(`Perms for ${role}:`);
        // console.log(perms);
        await (await RoleModel.create({
          name: role.name, 
          permissions: perms
        })).save();
      } else{
        console.log(`Permissions for ${role} already exist, skipping`);
      }
    }
  };
  await generateRolesForDirectory('./src/models/');
};