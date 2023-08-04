import { boolean, object, string } from 'yup';

export default object({
  name: string().required('Key name is required'),
  category: string()
    .oneOf(
      ['Idea', 'Random Thought', 'Task'],
      'Category must be either Idea, Task or Random Thought',
    )
    .required('Key category is required'),
  description: string().required('Key description is required'),
  archived: boolean().optional(),
});
