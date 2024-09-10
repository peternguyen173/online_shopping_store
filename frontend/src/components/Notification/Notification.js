import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Avatar } from '@mui/material';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Notification.module.scss';
import { deepPurple } from '@mui/material/colors';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '~/redux/Notification/Action';
import { notification } from 'antd';

const cx = classNames.bind(styles);

function Notification() {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications } = useSelector((store) => store.notifications);
    const jwt = localStorage.getItem('jwt');
    const dispatch = useDispatch();
    const [countNoti, setCountNoti] = useState(0); //Khai báo tạm ban đầu có 5 tin nhắn

    const handleClick = () => {
        setIsOpen(!isOpen);
        dispatch(getNotifications(jwt));
        setCountNoti(0);
    };

    useEffect(() => {
        dispatch(getNotifications(jwt));
    }, [jwt]);

    useEffect(() => {
        if (notifications) {
            setCountNoti(notifications.length);
        }
        console.log(notifications);
    }, [notifications]);

    const handleOutsideClick = (event) => {
        const notificationWrapper = document.getElementById('notification-wrapper');
        if (notificationWrapper && !notificationWrapper.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className={cx('wrapper')} id="notification-wrapper">
            <div className={cx('icon')} onClick={handleClick}>
                <FontAwesomeIcon icon={faBell} size="2x" />

                {countNoti > 0 && <span className={cx('countNoti')}>{countNoti}</span>}
            </div>

            {isOpen && (
                <div className={cx('notifi-box')}>
                    <h2>
                        Notifications <span>{countNoti}</span>
                    </h2>
                    {notifications.map((notification) => (
                        <div className={cx('notifi-item')}>
                            <div className={cx('avatar')}>
                                <Avatar
                                    className="text-white"
                                    aria-controls={'basic-menu'}
                                    aria-haspopup="true"
                                    aria-expanded={'true'}
                                    sx={{
                                        bgcolor: deepPurple[500],
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                ></Avatar>
                            </div>
                            <div className="text">
                                <h3>Thông báo từ Admin</h3>
                                <p>{notification?.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notification;
