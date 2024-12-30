import styles from './AuthorProfile.module.css';
import formatTimestamp from 'utils/formatTimestamp';

interface AuthorProfileProps {
  author: string;
  createdAt: string;
}
export default function AuthorProfile({
  author,
  createdAt,
}: AuthorProfileProps) {
  return (
    <div className={styles.profileBox}>
      <div className={styles.profileLeft}>
        <div className={styles.avatar} />
        <p className={styles.authorName}>{author}</p>
      </div>
      <p className={styles.postDate}>{formatTimestamp(createdAt)}</p>
    </div>
  );
}
