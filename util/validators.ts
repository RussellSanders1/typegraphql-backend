type ValidationReturn = {errors: Record<string, string>; valid: boolean}

export const validateRegisterInput = (username: string, email: string, password: string, confirmPassword: string): ValidationReturn => {
  const errors: Record<string, string> = {};
  if(username.trim() === ''){
    errors.username = 'Username must not be empty';
  }
  if(email.trim() === ''){
    errors.email = 'Email must not be empty';
  }

  if(password === ''){
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword){
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}
 
export const validateLoginInput = (username: string, password: string): ValidationReturn => {
  const errors: Record<string, string> = {};
  if(username.trim() === ''){
    errors.username = 'Username must not be empty';
  }
  if(password.trim() === ''){
    errors.password = 'Password must not be empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}