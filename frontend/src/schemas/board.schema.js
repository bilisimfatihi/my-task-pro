import * as yup from 'yup';

export const boardSchema = yup.object().shape({
  title: yup.string().trim().min(1).max(50).required('Board title is required'),
});
