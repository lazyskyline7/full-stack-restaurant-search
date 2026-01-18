import React, { useState, FC } from 'react';
import { Button, Typography } from '@material-ui/core';
import FavoriteRestaurantsContainer from '../components/FavortieContent/FavoriteRestaurantsContainer';
import { AddCircleOutline, EditOutlined } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { showMessage } from '../store/message/actions';
import { useHistory, useParams } from 'react-router';
import { useAppDispatch } from '../store/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editModeOnBtn: {
      gridArea: ' 3 / 2 / 4 / 3',
      backgroundColor: theme.palette.primary.light,
    },
    normalBtn: {
      gridArea: ' 3 / 2 / 4 / 3',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);

const FavoriteContent: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { content } = useParams<{ content: string }>();
  const classes = useStyles();
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      <Typography
        style={{
          gridArea: '2 / 1 / 3 / 13',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
        variant="h3"
        color="textPrimary"
      >
        {content}
      </Typography>
      <Button
        color="primary"
        className={editMode ? classes.editModeOnBtn : classes.normalBtn}
        startIcon={<EditOutlined />}
        onClick={() => {
          setEditMode((prev) => !prev);
        }}
      >
        Edit
      </Button>
      <Button
        color="primary"
        startIcon={<AddCircleOutline />}
        style={{ gridColumn: '11 / span 1' }}
        onClick={(): void => {
          dispatch(
            showMessage('Go search and add restaurants', () => {
              history.push('/');
            })
          );
        }}
      >
        Add
      </Button>
      <FavoriteRestaurantsContainer favoriteName={content} editMode={editMode} />
    </>
  );
};

export default FavoriteContent;
