import {getModelForClass, prop as Prop} from '@typegoose/typegoose';
import {IsEmail, IsPhoneNumber} from 'class-validator';
import {Field, ObjectType} from 'type-graphql';
import {Ref} from 'types';
import {User} from './User';
import {Department} from './Department';
import {Sponsor} from './Sponsor';

enum Status {
    'notSubmitted',
    'pending',
    'approved',
    'denied'
}

@ObjectType({description: 'Proposal model'})
export class Proposal {
    
    //fields
    @Field()
    @Prop({required: true})
    name: string;

    @Field()
    @Prop({required: true})
    @IsPhoneNumber('US')
    phone: string;

    @Field()
    @Prop({required: true})
    ipRequired: boolean;

    @Field()
    @Prop({required: true})
    ndaRequired: boolean;

    @Field()
    @Prop({required: true})
    dateSubmitted: Date;

    @Field(() => Status)
    @Prop({required: false, enum: Status})
    status: Status;

    @Field()
    @Prop({required: false})
    dateApproved: Date;

    @Field()
    @Prop({required: true})
    use: string;

    @Field()
    @Prop({required: true})
    financialSupport: string;

    @Field()
    @Prop({required: true})
    deliverables: string;

    @Field()
    @Prop({required: true})
    description: string;

    @Field()
    @Prop({required: true})
    @IsEmail()
    email: string;


    //Refs
    @Field(() => User)
    @Prop({required: true})
    creator: Ref<User>;

    @Field(() => [Sponsor])
    @Prop({required: false})
    sponsors: Ref<Sponsor>[];

    @Field(() => [Department])
    @Prop({required: true})
    departments: Ref<Department>[];

}

export const ProposalModel = getModelForClass(Proposal);