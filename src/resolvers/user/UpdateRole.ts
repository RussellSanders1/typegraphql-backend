
import { Resolver, Mutation, Arg, UseMiddleware} from 'type-graphql';
import {User, UserModel} from '../../models/User';
import {UserInputError} from 'apollo-server';
import {RoleModel} from '../../models/Role';
import {isAuth, Operation} from '../../middleware/isAuth';

@Resolver(() => User)
export class UpdateUserRoleResolver{

  @Mutation(() => User, {nullable: true})
  @UseMiddleware(isAuth('User', [Operation.Update]))
  async updateUserRoleByID(
    @Arg('id') id: string,
    @Arg('role') role: string): Promise<User | null> {

    const roleModel = await RoleModel.findOne({name: role});
    if(!roleModel){
      throw new UserInputError('Role does not exist', {
        errors: {
          role: 'This role does not exist'
        }
      });
    }

    const user = await UserModel.findByIdAndUpdate(id, {accessLevel: role});

    if(!user){
      throw new UserInputError('User does not exist', {
        errors: { 
          user: 'This user does not exist'
        }
      });
    }
    return UserModel.findById(id); 
  }
  
}