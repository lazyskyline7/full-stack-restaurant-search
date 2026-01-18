import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteFavorite, getFavorites, putFavorite } from '../../store/favorites/actions';
import { Favorite } from '../../store/favorites/types';
import { showMessage } from '../../store/message/actions';
import { State } from '../../store/rootReducer';
import FavoriteCard from './FavoriteCard';
import { useAppDispatch } from '../../store/hooks';

interface FavoritesContainerProps {
  editMode: boolean;
}
const FavoritesContainer: FC<FavoritesContainerProps> = ({ editMode }) => {
  const dispatch = useAppDispatch();
  const favorites = useSelector<State, Favorite[]>((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <div
      style={{
        gridArea: '4 / 2 / 12 / 12',
        width: '100%',
        overflow: 'scroll',
        display: 'grid',
        gridTemplate: 'repeat(3, 1fr) / repeat(5, 1fr)',
        gap: '3em',
      }}
    >
      {favorites.map((e) => (
        <FavoriteCard
          key={e.name}
          editMode={editMode}
          favorite={e}
          url={`/favorites/${e.name}`}
          selfEditName={(newName: string) => {
            dispatch(putFavorite(e.name, { name: newName, remove: false }));
          }}
          selfDelete={() => {
            dispatch(
              showMessage(`It will delete all items in "${e.name}", confirm?`, () => {
                dispatch(deleteFavorite(e.name));
              })
            );
          }}
        />
      ))}
    </div>
  );
};

export default FavoritesContainer;
