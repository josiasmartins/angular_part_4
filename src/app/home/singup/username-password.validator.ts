import { ValidatorFn, FormGroup } from '@angular/forms';

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {

  const userName = formGroup.get('userName').value;
  const password = formGroup.get('password').value;

  console.log(`userName: ${userName}, passsword: ${password}`);

  if (userName.trim() + password.trim()) {
    return userName != password
      ? null
      : { userNamePassword: true }
  } else {
    return null;
  }


}
