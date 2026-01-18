import React, { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SignupDialog from './SignupDialog';
import { DialogTitle } from '@material-ui/core';
import { login } from '../../../store/user/actions';
import { useAppDispatch } from '../../../store/hooks';

const LoginDialog: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const onDialogClose = () => {
    setOpen(false);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={(): void => setOpen(true)}>
        Login
      </Button>
      <Dialog open={open} onClose={(): void => setOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
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
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <SignupDialog />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={(): void => {
              onDialogClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={(): void => {
              dispatch(login(email, password));
              onDialogClose();
            }}
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginDialog;
