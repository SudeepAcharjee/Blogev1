import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from 'api/firebase';

export const useDeletePost = (
  postId: string,
  options?: UseMutationOptions<any, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown>(
    async () => {
      await deleteDoc(doc(db, 'posts', postId));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
      },
      ...options,
    }
  );
};

export default useDeletePost;
