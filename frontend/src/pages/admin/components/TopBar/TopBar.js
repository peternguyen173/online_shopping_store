import classNames from 'classnames/bind';
import styles from './TopBar.module.scss';
import Search from '~/components/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminSearch from '../AdminSearch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { logout } from '~/redux/Auth/Action';

const cx = classNames.bind(styles);

function TopBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [adminMenu, setAdminMenu] = useState(null);
    const open = Boolean(adminMenu);

    const handleClick = (event) => {
        setAdminMenu(event.currentTarget);
    };
    const handleClose = () => {
        setAdminMenu(null);
    };

    const handleLogout = () => {
        handleClose();
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>HUSTORE</div>
            <div className={cx('action')} onClick={handleClick}>
                <p className={cx('title')}>Admin</p>
                <AccountCircleIcon sx={{ fontSize: '3rem' }} />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={adminMenu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </div>
    );
}

export default TopBar;
