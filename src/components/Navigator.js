import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from'@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
 
export default function Navigator() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
      }
    
      const handleClose = () => {
        setAnchorEl(null);
      }

    return (
    <div>
        <Toolbar>
            <IconButton onClick={handleMenu}>
                <MenuIcon />
            </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><Link className="nav-link"to="/CustomerList" >Customers</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link className="nav-link"to="/TrainingList">Trainings</Link></MenuItem>
                </Menu>
        <Typography variant="h6" >
              Personal trainer
        </Typography>
        </Toolbar>
</div>
    );
}