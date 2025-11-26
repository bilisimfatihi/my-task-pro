import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name can be at most 40 characters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/(?=.*[A-Za-z]).{8,}/, 'Password must contain at least one letter and be at least 8 characters')
    .required('Password is required'),
});
