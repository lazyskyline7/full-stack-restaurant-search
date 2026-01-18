import React, { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '@material-ui/core';
import axios from 'axios';
import { showMessage } from '../../../store/message/actions';
import { useAppDispatch } from '../../../store/hooks';

const SignupDialog: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const resetTextField = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <>
      <Button color="inherit" style={{ margin: '0.5em 0.2em' }} onClick={(): void => setOpen(true)}>
        Register
      </Button>
      <Dialog open={open} onClose={(): void => setOpen(false)}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            required
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Name"
            type="name"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={(): void => {
              setOpen(false);
              resetTextField();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(): void => {
              if (email.length === 0) {
                dispatch(showMessage("Email can't be empty"));
              }
              if (password.length === 0) {
                dispatch(showMessage("Password can't be empty"));
              }
              axios
                .post('/api/user/signup', { name, username: email, password })
                .then(({ data }) => {
                  dispatch(showMessage('Sign up success'));
                  setOpen(false);
                  resetTextField();
                })
                .catch((err: ErrorResponse) => {
                  const {
                    response: { data },
                  } = err;
                  dispatch(showMessage(`${data.err.message}`));
                  setOpen(false);
                  resetTextField();
                });
            }}
          >
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type ErrorResponse = {
  response: {
    data: ErrorData;
  };
};
type ErrorData = {
  success?: boolean;
  status?: string;
  err: { name: string; message: string };
};

export default SignupDialog;
