import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import AuthorProfile from './AuthorProfile';
import { PostProps } from 'hooks/api/Post/useGetPosts';
import { useDeletePost } from 'hooks/api';

import styles from './PostBox.module.css';

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { id, title, summary, email, createdAt } = post;
  const { user } = useAuthContext();
  const { mutateAsync: deletePost } = useDeletePost(id);
  const navigate = useNavigate();

  return (
    <li className={styles.container}>
      <AuthorProfile author={email} createdAt={createdAt} />
      <Link to={`/posts/${id}`}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>{summary}</p>
      </Link>
      {user?.email === email && (
        <div className={styles.utilBox}>
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
          <div className={styles.button}>
            <Link to={`/posts/edit/${id}`}>Edit</Link>
          </div>
        </div>
      )}
    </li>
  );
}
