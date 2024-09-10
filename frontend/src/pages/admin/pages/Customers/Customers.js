import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import UserTable from '../../components/UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '~/redux/Admin/User/Action';
import * as message from '~/components/Message/Message';
import Loading from '~/components/LoadingComponent/Loading';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
    },
    { id: 'name', label: 'Họ và tên', minWidth: 100, align: 'left' },
    {
        id: 'phone',
        label: 'Số điện thoại',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'role',
        label: 'Vai trò',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
];

function UsersManagement() {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const isLoading = usersState.loading;
    const isError = usersState.error;

    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(usersState.users)) {
            setRows(usersState.users.map((user, index) => ({ ...user, index: index + 1 })));
        }
    }, [usersState]);


    const handleDelete = (user) => {
        console.log('user deleted', user);
        dispatch(deleteUser(user)).then(() => {
            dispatch(getAllUsers());
        });
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Khách hàng</h1>
                <UserTable columns={columns} rows={rows} rowPerPage={6} handleDelete={handleDelete} />
            </div>
        </Loading>
    );
}

export default UsersManagement;
