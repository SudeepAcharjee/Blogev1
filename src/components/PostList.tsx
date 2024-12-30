import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import PostBox from 'components/PostBox';
import { useGetPosts } from 'hooks/api';
import styles from './PostList.module.css';

interface PostListProps {
  onFilter?: boolean;
  defaultFilter?: FilterType | CategoryType;
}

export type FilterType = 'all' | 'my';

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';

export const CATEGORIES: CategoryType[] = [
  'Frontend',
  'Backend',
  'Web',
  'Native',
];

export default function PostList({
  onFilter = true,
  defaultFilter = 'all',
}: PostListProps) {
  const [activeFilter, setActiveFilter] =
    useState<FilterType | CategoryType>(defaultFilter);
  const { user } = useAuthContext();
  const userId = user?.email || '';
  const { data: posts, isLoading } = useGetPosts({
    userId: activeFilter === 'my' ? userId : undefined,
    activeFilter,
  });

  if (isLoading) {
    <p>...loading</p>;
  }

  return (
    <section>
      {onFilter && (
        <ul className={styles.filter}>
          <div className={styles.filterLeft}>
            <li
              role="presentation"
              className={`${styles.filterItem}  ${
                activeFilter === 'all' && styles.active
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </li>
            <li
              role="presentation"
              className={`${styles.filterItem}  ${
                activeFilter === 'my' && styles.active
              }`}
              onClick={() => setActiveFilter('my')}
            >
              My Posts
            </li>
          </div>
          <div className={styles.divider} />
          <div className={styles.filterRight}>
            {CATEGORIES?.map((category) => (
              <li
                key={category}
                role="presentation"
                className={`${styles.filterItem}  ${
                  activeFilter === category && styles.active
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </li>
            ))}
          </div>
        </ul>
      )}
      {!!posts?.length && (
        <ul className={styles.postList}>
          {posts?.map((post) => (
            <PostBox post={post} key={post.id} />
          ))}
        </ul>
      )}
      {posts?.length === 0 && (
        <div className={styles.noPosts}>
          <p>No Posts</p>

          <Link to="/posts/new">Let's write your first post</Link>
        </div>
      )}
    </section>
  );
}
