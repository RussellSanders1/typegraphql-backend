import {Resolver} from 'type-graphql';
import {Role, RoleModel} from '../../models/Role';
import {createResolver} from '../BaseCrudResolver';
import {CreateRoleInput, UpdateRoleInput} from './inputs';

const RoleCrudResolver = createResolver('Role',Role,RoleModel, CreateRoleInput, UpdateRoleInput, []);

@Resolver(() => Role)
export class RoleResolver extends RoleCrudResolver {}