import React, { FC } from 'react';
import { Outlet } from 'react-router';
import styles from './styles.module.scss';

export const Layout: FC = () => {
  return (
    <div className={styles.Layout}>
      <div className={styles.Layout__outletWrapper}>
        <Outlet />
      </div>
    </div>
  );
};
