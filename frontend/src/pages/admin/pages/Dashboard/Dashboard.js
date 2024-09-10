import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import StatisticItem from '../../components/DashboardPage/StatisticItem';
import admin_images from '~/assets/images/admin';
import RevenueChart from '../../components/DashboardPage/RevenueChart';
import DashboardListItem from '../../components/DashboardPage/DashboardListItem/DashboardListItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '~/redux/Admin/User/Action';
import { getAllProducts, getBestProducts } from '~/redux/Admin/Product/Action';
import { getAllOrders, getAllRevenue } from '~/redux/Admin/Order/Action';

const cx = classNames.bind(styles);

function Dashboard() {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const productsState = useSelector((state) => state.products);
    const adminOrdersState = useSelector((state) => state.adminOrders);

    useEffect(() => {
        dispatch(getAllRevenue());
        dispatch(getAllUsers());
        dispatch(getAllProducts());
        dispatch(getBestProducts());
        dispatch(getAllOrders());
    }, [dispatch]);

    // console.log('usersState?.users', usersState?.users);
    console.log('adminOrdersState', adminOrdersState);
    const limitedUsers = usersState?.users.slice(0, 4);
    const limitBestProducts = productsState?.bestProducts.slice(0, 4);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Dashboard</h1>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <StatisticItem
                        value={adminOrdersState?.allRevenue?.toLocaleString('vn-VN')}
                        unit="đ"
                        title="Tổng doanh thu"
                        img={admin_images.revenue}
                        backgroundImageColor="#F1EF99"
                    />
                    <StatisticItem
                        value={usersState?.users.length}
                        unit=""
                        title="Số khách hàng"
                        img={admin_images.user}
                        backgroundImageColor="#E78895"
                    />
                    <StatisticItem
                        value={productsState?.products.length}
                        unit=""
                        title="Số sản phẩm"
                        img={admin_images.product}
                        backgroundImageColor="#B4D4FF"
                    />
                    <StatisticItem
                        value={adminOrdersState?.orders.length}
                        unit=""
                        title="Tổng số đơn hàng"
                        img={admin_images.invoice}
                        backgroundImageColor="#8DECB4"
                    />
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('chart')}>
                        <h4 className={cx('chart-label')}>Doanh thu tuần</h4>
                        <RevenueChart />
                    </div>
                    <div className={cx('list-container')}>
                        <h4>Khách hàng mới</h4>
                        <div className={cx('list')}>
                            {limitedUsers.map((user, index) => {
                                const date = new Date(user?.createdAt);
                                const joinDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                                    .toString()
                                    .padStart(2, '0')}/${date.getFullYear()}`;
                                return (
                                    <DashboardListItem
                                        key={index}
                                        img={user.thumbnail ? user.thumbnail : admin_images.user}
                                        row1={user?.userDetailList[0].name}
                                        row2={`Ngày tham gia: ${joinDate}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('list-container')}>
                        <h4>Sản phẩm đánh giá tốt</h4>
                        <div className={cx('list')}>
                            {limitBestProducts.map((product, index) => {
                                return (
                                    <DashboardListItem
                                        key={index}
                                        img={product.thumbnail}
                                        row1={product.productName}
                                        row2={product.category.categoryName}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
