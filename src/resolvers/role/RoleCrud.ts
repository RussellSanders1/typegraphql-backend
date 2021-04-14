import {Resolver} from 'type-graphql';
import {Role, RoleModel} from '../../models/Role';
import {createResolver} from '../BaseCrudResolver';
import {CreateRoleInput} from './inputs';

const RoleCrudResolver = createResolver<typeof Role, typeof CreateRoleInput>('Role',Role,RoleModel, CreateRoleInput);

@Resolver(() => Role)
export class RoleResolver extends RoleCrudResolver {}