import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useHistory } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const history = useHistory();

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        checkLoginStatus();
        window.addEventListener('resize', showButton);
        return () => {
            window.removeEventListener('resize', showButton);
        };
    }, []);

    const checkLoginStatus = () => {
        const customerId = localStorage.getItem('customerId');
        setIsLogin(!!customerId);
    };

    const handleProtectedClick = (e, path) => {
        if (!isLogin) {
            e.preventDefault();
            setOpenDialog(true);
        } else {
            history.push(path);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img src='/images/Sportees Logo.png' alt='Sportees Logo' className='navbar-logo-image' />
                    </Link>
                    <div className='menu-icon'>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            {isLogin ? (
                                <Link
                                    to='/services'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Bookings
                                </Link>
                            ) : (
                                <a
                                    href='#'
                                    className='nav-links'
                                    onClick={(e) => handleProtectedClick(e, '/services')}
                                >
                                    Bookings
                                </a>
                            )}
                        </li>
                        <li className='nav-item'>
                            {isLogin ? (
                                <Link
                                    to='/facilities'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Facilities
                                </Link>
                            ) : (
                                <a
                                    href='#'
                                    className='nav-links'
                                    onClick={(e) => handleProtectedClick(e, '/facilities')}
                                >
                                    Facilities
                                </a>
                            )}
                        </li>
                        <li>
                            <Link
                                to={isLogin ? '/' : '/login'}
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                {isLogin ? 'Logout' : 'Login'}
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>{isLogin ? 'LOGOUT' : 'LOGIN'}</Button>}
                </div>
            </nav>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Log In Required"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You need to log in to view further details.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                    <Link to="/login" onClick={handleCloseDialog} className="nav-links">
                        <Button color="primary" autoFocus>
                            Log In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Navbar;
