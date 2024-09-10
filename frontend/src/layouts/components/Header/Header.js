import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';
import images from '~/assets/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Search';
import { useContext, useEffect, useState } from 'react';
import { store } from '~/redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '~/redux/Auth/Action';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import ChatModal from '~/components/ChatModal';
import { adminDetail } from '~/util/adminDetail';
import Notification from '~/components/Notification/Notification';

const cx = classNames.bind(styles);

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const { auth } = useSelector((store) => store);
    const { cart } = useSelector((store) => store.carts);
    const [anchorEl, setAnchorEl] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const openUserMenu = Boolean(anchorEl);
    const jwt = localStorage.jwt;
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt]);

    useEffect(() => {
        setCartCount(cart?.cartItemList.length);
    }, [cart]);

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseUserMenu = (event) => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        event.preventDefault(); // Prevent navigation
        setModalOpen(true);
    };

    const closeModal = (event) => {
        event.preventDefault(); // Prevent navigation
        setModalOpen(false);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        dispatch(logout());
        navigate('/');
    };

    const handleAdminDashboard = () => {
        navigate('/admin');
    };

    const handleMyOrder = () => {
        navigate('/account/order');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img className={cx('logo')} src={images.logo} alt="logo" />
                </Link>

                <Search placeholder="Tìm kiếm" />

                <nav className={cx('nav')}>
                    <Link to={config.routes.home} className={cx('home')}>
                        Trang chủ
                    </Link>
                    <Link to={config.routes.products} className={cx('products')}>
                        Sản phẩm
                    </Link>
                    <Link>Bán chạy</Link>
                    <Link>Blog</Link>
                    <Link onClick={handleClick}>Liên hệ</Link>
                </nav>
                {modalOpen && <ChatModal selectedUser={adminDetail} closeChatBox={closeModal} />}
                <div className={cx('actions')}>
                    {auth.user ? (
                        <div>
                            <div className={cx('nav-login-cart')}>
                                <div className={cx('noti')}>
                                    <Notification />
                                </div>
                                <div className={cx('cart-icon-wrapper')}>
                                    <Link to={config.routes.cart}>
                                        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                                    </Link>
                                    <span className={cx('nav-cart-count')}>{cartCount}</span>
                                </div>
                                <Avatar
                                    className="text-white"
                                    onClick={handleUserClick}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    sx={{
                                        bgcolor: deepPurple[500],
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {auth?.user?.name?.[0].toUpperCase()}
                                </Avatar>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openUserMenu}
                                    onClose={handleCloseUserMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem
                                        onClick={
                                            auth.user?.user?.role === 'ROLE_ADMIN'
                                                ? handleAdminDashboard
                                                : handleMyOrder
                                        }
                                    >
                                        {auth.user?.user?.role === 'ROLE_ADMIN' ? 'Admin Dashboard' : 'My Orders'}
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('nav-login-cart')}>
                            <Link to={config.routes.login}>
                                <Button primary>Đăng nhập</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
export default Header;
