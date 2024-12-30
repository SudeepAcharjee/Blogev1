import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from 'api/firebase';
import { CategoryType } from 'components/PostList';

interface IPostUpdate {
  title: string;
  summary: string;
  content: string;
  category: CategoryType;
}

export const useUpdatePost = (
  postId: string,
  options?: UseMutationOptions<any, unknown, IPostUpdate>
) => {
  return useMutation<any, unknown, IPostUpdate>(
    async ({ title, summary, content, category }: IPostUpdate) => {
      const postRef = doc(db, 'posts', postId);

      return await updateDoc(postRef, {
        title,
        summary,
        content,
        updatedAt: new Date().toISOString(),
        category,
      });
    },
    {
      ...options,
    }
  );
};

export default useUpdatePost;
