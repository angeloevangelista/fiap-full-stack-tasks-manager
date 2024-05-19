import * as yup from 'yup';

import { ValidationFault } from '../http';

async function validateSchema<T extends yup.AnyObject>(
  schema: yup.ObjectSchema<T>,
  object: T,
): Promise<T> {
  try {
    const validatedObject = await schema.validate(object, { abortEarly: false });

    return validatedObject as T
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new ValidationFault(...error.errors);
    }

    throw error;
  }
}

export { validateSchema };
