import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './RegistrationForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Grid } from '@mui/material';
import { register, resetError } from '~/redux/Auth/Action';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const RegistrationForm = () => {
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [timer, setTimer] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [ward, setWard] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        setTimer(
            setTimeout(() => {
                if (confirmPassword && password !== confirmPassword) {
                    setConfirmPasswordError('Mật khẩu xác nhận không khớp.');
                } else {
                    setConfirmPasswordError(null);
                }
            }, 800),
        );

        return () => clearTimeout(timer);
    }, [confirmPassword, password]);
    useEffect(() => {
        if (showPopup) {
            const timeout = setTimeout(() => {
                navigate('/login');
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [showPopup]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu xác nhận không khớp.');
            return;
        }

        setConfirmPasswordError(null);

        // Xử lý đăng ký
        dispatch(
            register({ email, password, name, address: province + ', ' + city + ', ' + ward, phoneNumber: phone }),
        );
        setShowPopup(true);
    };
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
        if (error) dispatch(resetError());
    };

    return (
        <div className={cx('registration-form')}>
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Nhập email"
                        required
                        value={email}
                        onChange={handleInputChange(setEmail)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password">Mật khẩu *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        required
                        value={password}
                        onChange={handleInputChange(setPassword)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                        required
                        value={confirmPassword}
                        onChange={handleInputChange(setConfirmPassword)}
                    />
                </div>
                {confirmPasswordError && <p className={cx('error-message')}>{confirmPasswordError}</p>}
                <Grid container spacing={3} className={cx('user-info')}>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="firstName">Họ *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder=""
                                required
                                value={lastName}
                                onChange={handleInputChange(setLastName)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="lastName">Tên *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder=""
                                required
                                value={name}
                                onChange={handleInputChange(setName)}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="city">Tỉnh/Thành phố *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder=""
                                required
                                value={province}
                                onChange={handleInputChange(setProvince)}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="district">Quận/Huyện *</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                placeholder=""
                                required
                                value={city}
                                onChange={handleInputChange(setCity)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="ward">Phường/Xã *</label>
                            <input
                                type="text"
                                id="ward"
                                name="ward"
                                placeholder=""
                                required
                                value={ward}
                                onChange={handleInputChange(setWard)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="phoneNumber">Số điện thoại *</label>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder=""
                                required
                                value={phone}
                                onChange={handleInputChange(setPhone)}
                            />
                        </div>
                    </Grid>
                </Grid>
                {error && <p className={cx('error-message')}>{error.message}</p>}
                <div className={cx('form-group')}>
                    <button type="submit" className={cx('btn', 'btn-primary')}>
                        Đăng ký
                    </button>
                </div>
            </form>
            <div className={cx('registration-options')}>
                <Link to={config.routes.login}>Bạn đã có tài khoản? Đăng nhập</Link>
            </div>
            <div className={cx('registration-terms')}>
                <p>Việc tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
            </div>
            {showPopup && (
                <div className={cx('overlay')}>
                    <div className={cx('popup')}>
                        <div className={cx('wrapper')}>
                            <img src={images.tick} alt="Success" />
                            <h2>Cảm ơn bạn!</h2>
                            <p>Bạn vừa yêu cầu đăng ký tài khoản. Vui lòng truy cập email để thực hiện xác minh</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;
