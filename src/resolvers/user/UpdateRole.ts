
import { Resolver, Mutation, Arg, UseMiddleware} from 'type-graphql';
import {User, UserModel} from '../../models/User';
import {UpdateUserRoleInput} from './inputs';
import {UserInputError} from 'apollo-server';
import {RoleModel} from '../../models/Role';
import {isAuth, Operation} from '../../middleware/isAuth';

@Resolver(() => User)
export class UpdateRoleResolver{

  @Mutation(() => User, {nullable: true})
  @UseMiddleware(isAuth('User', [Operation.Update]))
  async updateRoleByID(
    @Arg('id') id: string,
    @Arg('data') data: UpdateUserRoleInput): Promise<User> {
    const {role} = data;


    const roleModel = await RoleModel.findOne({name: role});
    if(!roleModel){
      throw new UserInputError('Role does not exist', {
        errors: {
          role: 'This role does not exist'
        }
      });
    }

    const user = (await UserModel.findByIdAndUpdate(id, {roleID: roleModel._id}));

    if(!user){
      throw new UserInputError('User does not exist', {
        errors: { 
          user: 'This user does not exist'
        }
      });
    }
    return user;
  }
  
}