import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { getFavorites, putFavorite } from '../../store/favorites/actions';
import { Favorite } from '../../store/favorites/types';
import { State } from '../../store/rootReducer';
import RestaurantCard from './RestaurantCard';
import { useAppDispatch } from '../../store/hooks';

interface FavoriteRestaurantsContainerProps {
  editMode: boolean;
  favoriteName: string;
}
const FavoriteRestaurantsContainer: FC<FavoriteRestaurantsContainerProps> = ({
  editMode,
  favoriteName,
}) => {
  const dispatch = useAppDispatch();
  const favorite = useSelector<State, Favorite | null>(
    (state) => state.favorites.find((e) => e.name === favoriteName) ?? null
  );

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  if (favorite === null) return <Redirect to="/favorites" />;

  return (
    <div
      style={{
        gridArea: '4 / 2 / 13 / 12',
        width: '100%',
        overflow: 'scroll',
        display: 'grid',
        gridTemplate: 'repeat(2, 1fr) / repeat(4, 1fr)',
        gap: '3em',
      }}
    >
      {favorite.restaurants.map((e) => (
        <RestaurantCard
          key={e.name}
          editMode={editMode}
          restaurant={e}
          selfDelete={() => {
            dispatch(putFavorite(favorite.name, { restaurant: e, remove: true }));
          }}
        />
      ))}
    </div>
  );
};

export default FavoriteRestaurantsContainer;
