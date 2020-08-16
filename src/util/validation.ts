//Validation
export interface Validator {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(input: Validator) {
  let isValid = true;
  //Exists Check
  if (input.required) { 
    isValid = isValid && input.value.toString().trim().length !== 0 
  }//Minimum Length Check
  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.minLength
  }//Maxium Length Check
  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length <= input.maxLength
  }//Minimum Value Check
  if (input.min != null && typeof input.value == 'number') {
    isValid = isValid && !!(input.value >= input.min)
  }//Maximum Value Check
  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && !!(input.value <= input.max)
  }//Return True or False 
  return isValid;
}
