import * as yup from 'yup';

export const columnSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(1)
    .max(50)
    .required('Column title is required'),
});
