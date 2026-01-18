import React, { FC } from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { State } from '../store/rootReducer';
import { Message } from '../store/message/types';
import { closeMessage } from '../store/message/actions';
import { useAppDispatch } from '../store/hooks';

const MessageDialog: FC = () => {
  const dispatch = useAppDispatch();
  const message = useSelector<State, Message>((state) => state.message);

  return (
    <Dialog
      open={message.open}
      onClose={(): void => {
        dispatch(closeMessage());
      }}
    >
      <DialogContent>
        <Typography variant="body1">{message.content}</Typography>
      </DialogContent>
      <DialogActions>
        {message.confirmFunction !== null && (
          <Button
            variant="contained"
            color="secondary"
            onClick={(): void => {
              dispatch(closeMessage());
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={(): void => {
            if (message.confirmFunction !== null) {
              message.confirmFunction();
            }
            dispatch(closeMessage());
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
