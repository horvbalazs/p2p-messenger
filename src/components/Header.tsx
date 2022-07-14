import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../thunks/auth.thunk";
import { useContext, useState } from "react";
import { WebsocketContext } from "../contexts/websocket.context";

const Header = () => {
  const websocket = useContext(WebsocketContext);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);

  const handleLogout = () => {
    dispatch(logout(websocket));
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

  const name = useAppSelector((state) => state.auth.username);
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <ForumRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>P2PM</Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {loggedIn ? name : ''}
        </Typography>
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={handleClose} disabled={!loggedIn}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Change name
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={!loggedIn}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;