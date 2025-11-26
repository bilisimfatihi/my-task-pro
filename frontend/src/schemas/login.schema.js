import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(1, 'Password is required')
    .required('Password is required'),
});
