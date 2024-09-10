import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminPanel.module.scss';

import Dashboard from './pages/Dashboard';
import ProductsManagement from './pages/Products';
import UsersManagement from './pages/Customers';
import OrdersManagement from './pages/Orders';
import TopBar from './components/TopBar';
import AddProducts from './pages/AddProducts';
import Vouchers from './pages/Vouchers';
import Chat from '~/components/Chat';

import { SideBarAdminData } from './SideBarData';
import SideBar from './components/SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '~/redux/Auth/Action';
import CategoriesManagement from './pages/Categories/Categories';

const cx = classNames.bind(styles);

function AdminPanel() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const jwt = localStorage.jwt;
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    return (
        <div className={cx('admin-wrapper')}>
            <TopBar />
            <div className={cx('container')}>
                <SideBar data={SideBarAdminData} type="admin" />
                <div className={cx('main')}>
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/products" element={<ProductsManagement />}></Route>
                        <Route path="/categories" element={<CategoriesManagement />}></Route>
                        <Route path="/users" element={<UsersManagement />}></Route>
                        <Route path="/add-products" element={<AddProducts />}></Route>
                        <Route path="/discount" element={<Vouchers />}></Route>
                        <Route path="/orders" element={<OrdersManagement />}></Route>
                        <Route path="/chat" element={<Chat />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
