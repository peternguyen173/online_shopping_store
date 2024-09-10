import React from 'react';
import classNames from 'classnames/bind';
import styles from './AddressCard.module.scss';

const cx = classNames.bind(styles);

const AddressCard = ({ address }) => {
    return (
        <div>
            {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
            <div className={cx('space-y-3')}>
                <div className={cx('space-y-1')}>
                    <p className={cx('font-semibold')}>Tên người nhận</p>
                    <p>{`${address?.name}`}</p>
                </div>
                <div className={cx('space-y-1')}>
                    <p className={cx('font-semibold')}>Địa chỉ</p>
                    <p>{`${address?.address}`}</p>
                </div>
                <div className={cx('space-y-1')}>
                    <p className={cx('font-semibold')}>Số điện thoại</p>
                    <p>{address?.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;
