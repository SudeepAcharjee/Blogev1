import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from '@firebase/firestore';
import { db } from 'api/firebase';

const useGetPost = (postId: string, options?: any) => {
  return useQuery<any, Error>(
    ['postById', postId],
    async () => {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);

      return { ...docSnap?.data(), id: docSnap.id };
    },
    {
      ...options,
    }
  );
};
export default useGetPost;
