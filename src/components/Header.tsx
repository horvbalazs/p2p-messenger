import styled from "@emotion/styled";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import InfoIcon from '@mui/icons-material/Info';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../thunks/auth.thunk";
import { useContext, useState } from "react";
import { WebsocketContext } from "../contexts/websocket.context";

const Username = styled.div`
  text-align: center;
`;

const Header = () => {
  const websocket = useContext(WebsocketContext);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);

  const handleLogout = () => {
    dispatch(logout(websocket))
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
    <AppBar position="static">
      <Toolbar>
        <ForumRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 0 }}>P2PM</Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Username>{loggedIn ? name : ''}</Username>
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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
          <InfoIcon />
          About
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;