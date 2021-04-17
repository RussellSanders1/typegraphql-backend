import { UserModel } from '../../../models/User';
import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}

@ValidatorConstraint({name: 'IsEmailUnique'})
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {

  validate(email: string) {
    return UserModel.findOne({email}).then(user => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    const email = args.value;
    return `${email} is already in use`;
  }
}