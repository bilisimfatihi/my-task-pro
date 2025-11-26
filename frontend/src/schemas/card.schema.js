import * as yup from 'yup';

export const cardSchema = yup.object().shape({
  title: yup.string().trim().min(1).max(50).required('Title is required'),
  description: yup
    .string()
    .trim()
    .max(500, 'Description can be at most 500 characters'),
  priority: yup
    .string()
    .oneOf(['none', 'low', 'medium', 'high'])
    .default('none'),
  deadline: yup.date().nullable(),
});
