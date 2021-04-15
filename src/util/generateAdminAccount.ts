import {RoleModel} from '../models/Role';
import {UserModel} from '../models/User';
import bcrypt from 'bcryptjs';

export const generateAdmin = async () => {
  const adminRole = await RoleModel.findOne({name: 'Admin'});
  //make sure admin role is created already
  if(!adminRole){
    throw new Error('Server setup error: Admin role does not exist');
  }

  const findAdmin = await UserModel.findOne({email: process.env.ADMIN_EMAIL!});
  if(findAdmin){
    return;
  }
  
  //hash admin password
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);
  
  //save admin user to DB
  await (await UserModel.create({
    firstName: process.env.ADMIN_FIRSTNAME!,
    lastName: process.env.ADMIN_LASTNAME!,
    email: process.env.ADMIN_EMAIL,
    password, 
    accessLevel: 'Admin',
    createdAt: new Date()
  })).save();
};