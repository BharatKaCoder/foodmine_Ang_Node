import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator function to check if passwords match
export const confirmPasswordValidator = (passwordControlName:string, confirmPasswordControlName:string)=> {
  const validator = (form:AbstractControl)=>{
    const password = form.get(passwordControlName);
    const confirmPassword = form.get(confirmPasswordControlName);
    if (!password || !confirmPassword) return;
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      const error = confirmPassword.errors;
      if(!error) return;
      delete error['mismatch'];
      confirmPassword.setErrors(error);
    }
    return validator;
  }
  // return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
  //   const password = formGroup.get('password');
  //   const confirmPassword = formGroup.get('confirmPassword');

  //   // Check if both fields are present and have the same value
  //   if (password && confirmPassword && password.value !== confirmPassword.value) {
  //     return { 'mismatch': true };
  //   }
  //   return null;
  // };
}