import React, { FC, useRef, useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Search } from '@material-ui/icons';
import { makeStyles, createStyles, Theme, fade, InputBase, Button } from '@material-ui/core';
import { getRestaurants, TimeObject } from '../../store/restaurants/actions';
import { DateOptions, Dates } from '../../util/dateOperations';
import DateButtonGroup from './DateButtonGroup';
import TimeInput from './TimeInput';
import { useAppDispatch } from '../../store/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridArea: '2 / 1 / 4 / 13',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      width: '100%',
    },
    searchContainer: {
      padding: '1em',
      width: '80%',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    dateSelectorContainer: {
      width: '80%',
      padding: '1em',
      display: 'flex',
      justifyContent: 'space-around',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.35),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.55),
      },
      width: '80%',
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      width: '100%',
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
  })
);

const SearchField: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState<string>('');
  const date = new Date().getDay().toString();
  const initSearchDateOption = useRef<DateOptions>({
    [Dates.sun]: false,
    [Dates.mon]: false,
    [Dates.tue]: false,
    [Dates.wed]: false,
    [Dates.thu]: false,
    [Dates.fri]: false,
    [Dates.sat]: false,
  });
  const [searchDateOption, setSearchDateOption] = useState<DateOptions>(
    initSearchDateOption.current
  );
  const [searchTime, setSearchTime] = useState<TimeObject>({ hour: '', min: '', am: false });
  const [isSearchFieldFocus, setIsSearchFieldFocus] = useState<boolean>(false);

  const dates = useMemo<Dates[]>(() => {
    return (Object.keys(searchDateOption) as Dates[]).filter((date) => searchDateOption[date]);
  }, [searchDateOption]);

  const searchRestaurants = useCallback(() => {
    dispatch(getRestaurants(searchName, dates, searchTime));
    setIsSearchFieldFocus(false);
  }, [
    searchName,
    dates,
    searchTime,
    dispatch,
    setIsSearchFieldFocus,
  ]);

  useEffect(() => {
    initSearchDateOption.current = { ...initSearchDateOption.current, [date]: true };
    setSearchDateOption(initSearchDateOption.current);
  }, [date, setSearchDateOption]);

  useEffect(() => {
    const pressEnterCallback = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        searchRestaurants();
      }
    };

    if (isSearchFieldFocus) {
      window.addEventListener('keypress', pressEnterCallback);
      return () => window.removeEventListener('keypress', pressEnterCallback);
    }
  }, [isSearchFieldFocus, searchRestaurants]);

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Enter Restaurant Name..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchName}
            onFocus={() => {
              setIsSearchFieldFocus(true);
            }}
            onBlur={() => {
              setIsSearchFieldFocus(false);
            }}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            searchRestaurants();
          }}
        >
          Search
        </Button>
      </div>
      <div className={classes.dateSelectorContainer}>
        <DateButtonGroup dateOptions={searchDateOption} setDateOptions={setSearchDateOption} />
        <TimeInput setSearchTime={setSearchTime} />
      </div>
    </div>
  );
};

export default memo(SearchField);
