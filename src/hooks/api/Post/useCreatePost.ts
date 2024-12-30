import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { collection, addDoc, DocumentReference } from '@firebase/firestore';
import { db } from 'api/firebase';
import { CategoryType } from 'components/PostList';

interface IPost {
  title: string;
  summary: string;
  content: string;
  email: string;
  category: CategoryType;
}

export const useCreatePost = (
  options?: UseMutationOptions<DocumentReference, unknown, IPost>
) => {
  return useMutation<DocumentReference, unknown, IPost>(
    async ({ title, summary, content, email, category }: IPost) => {
      const data = await addDoc(collection(db, 'posts'), {
        title,
        summary,
        content,
        createdAt: new Date().toISOString(),
        email,
        category,
      });

      return data;
    },
    {
      ...options,
    }
  );
};

export default useCreatePost;
