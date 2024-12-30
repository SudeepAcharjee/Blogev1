import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import AuthorProfile from 'components/AuthorProfile';
import { Page } from 'components/ui';

import { useGetPost, useDeletePost } from 'hooks/api';
import styles from './Detail.module.css';
import formatTimestamp from 'utils/formatTimestamp';

export default function Detail() {
  const params = useParams();
  const { user } = useAuthContext();

  const postId = params.id as string;

  const { data: post } = useGetPost(postId, {
    enabled: !!postId,
  });

  const navigate = useNavigate();

  const { mutateAsync: deletePost } = useDeletePost(postId);

  return (
    <Page>
      <h3 className={styles.title}>{post?.title}</h3>
      <AuthorProfile author={post?.email} createdAt={post?.createdAt} />
      <div
        className={`${styles.utilBox} ${
          !post?.category && user?.email !== post?.email && styles.none
        } ${!post?.category && styles.utilBtnBoxRight}`}
      >
        {post?.category && (
          <div className={styles.category}>{post?.category}</div>
        )}

        {user?.email === post?.email && (
          <div className={styles.utilBtnBox}>
            <div className={styles.button}>
              <Link to={`/posts/edit/${postId}`}>Edit</Link>
            </div>
            <div
              className={styles.button}
              onClick={async () => {
                if (
                  window.confirm('Are you sure you want to delete this post?')
                ) {
                  await deletePost();
                  navigate('/');
                }
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
      {post?.updatedAt && (
        <p className={styles.updatedAt}>{`Last Edited : ${formatTimestamp(
          post?.updatedAt
        )}`}</p>
      )}
      <p className={styles?.content}>{post?.content}</p>
    </Page>
  );
}
