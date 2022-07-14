import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Button, Dialog, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../thunks/auth.thunk";
import { FormEvent, useContext, useState } from "react";
import { WebsocketContext } from "../contexts/websocket.context";
import { AuthTypes, ContactTypes } from '../models';
import DialogContainer from './common/DialogContainer';
import FormContainer from './common/FormContainer';

const Header = () => {
  const {loggedIn, username, clientId} = useAppSelector(state => state.auth);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const websocket = useContext(WebsocketContext);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    if (clientId) {
      dispatch(logout(clientId, websocket));
    }
    handleClose();
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoHome = () => {
    dispatch({
      type: ContactTypes.SELECT,
      payload: {
        clientId: undefined,
      }
    });
    handleClose();
  }

  const handleChangeName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newName) return;

    dispatch({
      type: AuthTypes.CHANGE_NAME,
      payload: {
        username: newName,
      }
    });
    setNewName('');
    setDialogOpen(false);
  }

  return (<>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <ForumRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>P2PM</Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right', paddingRight: '10px' }}>
          {loggedIn ? username : ''}
        </Typography>
        {loggedIn && <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>}
      </Toolbar>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleGoHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem  onClick={() => {
            setDialogOpen(true);
            handleClose();
          }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Change name
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      <DialogContainer>
        <DialogTitle>Change name</DialogTitle>
        <FormContainer onSubmit={handleChangeName}>
          <TextField id="new-name" placeholder={username} variant="outlined" onChange={e => setNewName(e.target.value)} value={newName} autoComplete="off" />
          <Button variant="contained" type="submit">
            Done
          </Button>
        </FormContainer>
      </DialogContainer>
    </Dialog>
  </>);
};

export default Header;