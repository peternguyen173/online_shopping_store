import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { login, resetError } from '~/redux/Auth/Action';
import { SET_ERROR } from '~/redux/Auth/ActionTypes';

const cx = classNames.bind(styles);

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading, user } = useSelector((state) => state.auth);
    const isSubmitted = useRef(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ email, password }));
        isSubmitted.current = true;
        console.log('Email:', email);
        console.log('Mật khẩu:', password);
    };

    useEffect(() => {
        if (isSubmitted.current && !isLoading && !error) {
            setIsLogged(true);
        }
    }, [isLoading, error]);

    useEffect(() => {
        dispatch(resetError());
    }, []);

    useEffect(() => {
        if (isLogged && user) {
            if (user.user.role === 'ADMIN') navigate('/admin');
            else navigate('/');
        }
    }, [isLogged, user]);

    return (
        <div className={cx('login-form')}>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Nhập email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="**********"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {error && <p className={cx('error-message')}>{error.message}</p>}
                <div className={cx('remember-forgot')}>
                    <label>
                        <input type="checkbox" /> Nhớ tài khoản
                    </label>
                    <a href="#">Quên mật khẩu?</a>
                </div>
                <div className={cx('form-group')}>
                    <button type="submit" className={cx('btn', 'btn-primary')}>
                        Đăng nhập
                    </button>
                </div>
            </form>
            <div className={cx('register-link')}>
                <p>
                    Bạn chưa có tài khoản? <Link to={config.routes.register}>Đăng ký</Link>{' '}
                </p>
            </div>
            <div className={cx('login-terms')}>
                <p>Việc tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
            </div>
        </div>
    );
};

export default LoginForm;
