import React, { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { State } from '../../store/rootReducer';
import { closeDialog, openDialog } from '../../store/dialog/actions';
import { AddCircleOutline } from '@material-ui/icons';
import { postFavorite } from '../../store/favorites/actions';
import { showMessage } from '../../store/message/actions';
import { useAppDispatch } from '../../store/hooks';

const AddFavoriteDialog: FC = () => {
  const isOpen = useSelector<State, boolean>((state) => state.dialogIsOpen);
  const dispatch = useAppDispatch();
  const [favoriteName, setFavoriteName] = useState<string>('');

  return (
    <>
      <Button
        color="primary"
        startIcon={<AddCircleOutline />}
        style={{ gridColumn: '11 / span 1' }}
        onClick={(): void => {
          dispatch(openDialog());
        }}
      >
        Add
      </Button>
      <Dialog
        open={isOpen}
        onClose={(): void => {
          dispatch(closeDialog());
        }}
      >
        <DialogTitle>Add a new Favorite List</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={favoriteName}
            onChange={(e) => {
              setFavoriteName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={(): void => {
              setFavoriteName('');
              dispatch(closeDialog());
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(): void => {
              if (favoriteName !== '') {
                dispatch(postFavorite(favoriteName.toString()));
                setFavoriteName('');
                dispatch(closeDialog());
              } else {
                dispatch(showMessage('Empty name is not valid'));
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFavoriteDialog;
