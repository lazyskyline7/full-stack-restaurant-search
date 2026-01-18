import React, { FC, PropsWithChildren } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100vw',
      height: '100vh',
      display: 'grid',
      gridTemplate: 'repeat(12, 1fr) / repeat(12, 1fr)',
      justifyItems: 'center',
      gridGap: theme.spacing(3),
    },
  })
);

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export default Layout;
