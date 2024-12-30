import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Page.module.css';

interface IPage {
  children: ReactNode;
  center?: boolean;
}

export default function Page({ center, children }: IPage) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <section className={`${styles.container} ${center && styles.center}`}>
      {children}
    </section>
  );
}
