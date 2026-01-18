import React, { FC, memo } from 'react';

import { IconButton } from '@material-ui/core';
import { Bookmark } from '@material-ui/icons';
import { User } from '../../../store/user/types';
import { putFavorite } from '../../../store/favorites/actions';
import { Favorite } from '../../../store/favorites/types';
import { showMessage } from '../../../store/message/actions';
import { openDialog } from '../../../store/dialog/actions';
import { useHistory } from 'react-router';
import PopupMenuList, { PopupMenuItemProps } from '../../PopupMenuList';
import { Restaurant } from '../../../store/restaurants/types';
import { useAppDispatch } from '../../../store/hooks';

interface AddToFavoriteBtnProps {
  restaurant: Restaurant;
  favorites: Favorite[];
  user: User;
}
const AddToFavoriteBtn: FC<AddToFavoriteBtnProps> = ({ restaurant, favorites, user }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  // * If not login
  if (user === null) return <div />;
  // * If no favorite created, go and add favorite
  if (favorites.length === 0) {
    return (
      <IconButton
        color="inherit"
        onClick={() => {
          dispatch(
            showMessage('No favorite created. Create one?', () => {
              history.push('/favorites');
              dispatch(openDialog());
            })
          );
        }}
      >
        <Bookmark />
      </IconButton>
    );
  }

  const menuItems: PopupMenuItemProps[] = favorites.map((e) => ({
    name: e.name,
    onClick: () => {
      dispatch(putFavorite(e.name, { restaurant, remove: false }));
    },
  }));

  return (
    <PopupMenuList menuItems={menuItems} title="Add to favorite list">
      <Bookmark />
    </PopupMenuList>
  );
};

export default memo(AddToFavoriteBtn);
