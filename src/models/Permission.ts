import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {Field, InputType, ObjectType} from 'type-graphql';
import {Ref} from '../types/Ref';
import {Role} from './Role';


@ObjectType({ description: 'Permission model'})
export class Permission {
  // @Field(() => Role)
  // @Prop({required: false})
  // role: Ref<Role>;

  @Prop({required: true})
    @Field()
    collectionName: string;

    @Prop({required: true, default: false})
    @Field({defaultValue: false})
    create: boolean;

    @Prop({required: true, default: false})
    @Field({defaultValue: false})
    read: boolean;

    @Prop({required: true, default: false})
    @Field({defaultValue: false})
    update: boolean;

    @Prop({required: true, default: false}) 
    @Field({defaultValue: false})
    delete: boolean;
    
    constructor(collectionName: string, create: boolean, read: boolean, update: boolean, del: boolean,){
      this.collectionName = collectionName;
      this.create = create;
      this.read = read;
      this.update = update;
      this.delete = del;
    }
}

export const PermissionModel = getModelForClass(Permission);