import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { State } from '../../../store/rootReducer';
import { Restaurant } from '../../../store/restaurants/types';
import { parseTimeToStr, dayList } from '../../../util/dateOperations';
import { User } from '../../../store/user/types';
import { getFavorites } from '../../../store/favorites/actions';
import { Favorite } from '../../../store/favorites/types';
import AddToFavoriteBtn from './AddToFavoriteBtn';
import { resetRestaurants } from '../../../store/restaurants/actions';
import { useAppDispatch } from '../../../store/hooks';

const SearchResultTable: FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants, user, favorites } = useSelector<
    State,
    { restaurants: Restaurant[]; user: User; favorites: Favorite[] }
  >((state) => ({
    favorites: state.favorites,
    restaurants: state.restaurants,
    user: state.user,
  }));

  useEffect(() => {
    if (user !== null) dispatch(getFavorites());
  }, [user, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetRestaurants());
    };
  }, [dispatch]);

  return (
    <TableContainer style={{ gridArea: '5 / 1 / 12 / 13', width: '90%' }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {dayList.map((e) => (
              <TableCell key={e}>{e}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((row, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[0].open, row[0].close)}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[1].open, row[1].close)}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[2].open, row[2].close)}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[3].open, row[3].close)}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[4].open, row[4].close)}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[5].open, row[5].close)}
                </TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }} align="right">
                  {parseTimeToStr(row[6].open, row[6].close)}
                </TableCell>
                <TableCell>
                  <AddToFavoriteBtn restaurant={row} favorites={favorites} user={user} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResultTable;
