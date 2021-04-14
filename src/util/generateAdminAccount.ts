import {RoleModel} from '../models/Role';
import {UserModel} from '../models/User';
import bcrypt from 'bcryptjs';
import {ADMIN_INFO} from '../../config';

export const generateAdmin = async () => {
  const adminRole = await RoleModel.findOne({name: 'Admin'});
  //make sure admin role is created already
  if(!adminRole){
    throw new Error('Server setup error: Admin role does not exist');
  }

  const findAdmin = await UserModel.findOne({email: ADMIN_INFO.email});
  if(findAdmin){
    return;
  }

  //hash admin password
  const password = await bcrypt.hash(ADMIN_INFO.password, 12);
  
  //save admin user to DB
  await (await UserModel.create({
    ...ADMIN_INFO,
    password,
    roleID: adminRole._id,
    createdAt: new Date()
  })).save();
};