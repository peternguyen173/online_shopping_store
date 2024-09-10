import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Vouchers.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Modal } from '@mui/material';
import VoucherTable from '../../components/VoucherTable';
import { useDispatch, useSelector } from 'react-redux';
import { createVoucher, deleteVoucher, getAllVouchers, updateVoucher } from '~/redux/Admin/Voucher/Action';
import Loading from '~/components/LoadingComponent/Loading';
import * as message from '~/components/Message/Message';

const cx = classNames.bind(styles);
const jwt = localStorage.getItem('jwt');
const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'code', label: 'Mã giảm giá', minWidth: 100, align: 'left' },
    {
        id: 'value',
        label: 'Giá trị',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'condition',
        label: 'Điều kiện đơn hàng',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'maximum_value',
        label: 'Giá trị tối đa',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'date',
        label: 'Ngày hết hạn',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'update',
        label: 'Cập nhật',
        minWidth: 100,
        align: 'left',
    },
];

// const rows = data.map((element, index) => ({ ...element, index: index + 1 }));

function Vouchers() {
    const [openAddVoucher, setOpenAddVoucher] = useState(false);

    const dispatch = useDispatch();
    const vouchersState = useSelector((state) => state.vouchers);
    const isLoading = vouchersState.loading;
    const isError = vouchersState.error;

    useEffect(() => {
        dispatch(getAllVouchers());
    }, [dispatch]);

    const rows = vouchersState.vouchers.map((voucher, index) => ({ ...voucher, index: index + 1 }));

    const handleOpenAddVoucher = () => {
        setOpenAddVoucher(true);
    };

    const handleCloseAddVoucher = () => {
        setOpenAddVoucher(false);
    };

    // Gọi API ở đây
    const handleDelete = (voucher) => {
        dispatch(deleteVoucher(voucher)).then(() => {
            dispatch(getAllVouchers());
        });
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    const handleUpdateVoucher = (voucher, id) => {
        console.log(voucher, id);
        dispatch(updateVoucher(voucher, id)).then(() => {
            dispatch(getAllVouchers());
        });
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    const handleAddVoucher = (newVoucher) => {
        const endDate = newVoucher.endDate.split('-');
        newVoucher.endDate = `${endDate[2]}/${endDate[1]}/${endDate[0]}`;

        dispatch(createVoucher({ data: newVoucher, jwt })).then(() => {
            dispatch(getAllVouchers());
        });
        handleCloseAddVoucher();
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <div className={cx('top')}>
                    <h1 className={cx('title')}>Danh sách Voucher</h1>
                    <div className={cx('add-voucher')} onClick={handleOpenAddVoucher}>
                        <AddCircleIcon sx={{ color: 'green', fontSize: '1.8rem' }} />
                        <p>Thêm Voucher mới</p>
                    </div>

                    <Modal
                        open={openAddVoucher}
                        onClose={handleCloseAddVoucher}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {/* <Loading isLoading={isLoading}> */}
                        <div className={cx('add-voucher-box')}>
                            <p className={cx('add-voucher-title')}>Thêm Voucher mới</p>
                            <div className={cx('add-voucher-wrapper')}>
                                <div className={cx('add-voucher-row')}>
                                    <p>Mã voucher</p>
                                    <input id="new-voucher-code" type="text" placeholder="Nhập mã Voucher" />
                                </div>

                                <div className={cx('add-voucher-row')}>
                                    <p>Giá trị giảm (%)</p>
                                    <input id="new-voucher-value" type="text" placeholder="Giá trị giảm (%)" />
                                </div>

                                <div className={cx('add-voucher-row')}>
                                    <p>Giá trị tối đa</p>
                                    <input
                                        id="new-voucher-maximum-value"
                                        type="text"
                                        placeholder="Giá trị tối đa (VND)"
                                    />
                                </div>

                                <div className={cx('add-voucher-row')}>
                                    <p>Điều kiện đơn hàng</p>
                                    <input
                                        id="new-voucher-condition"
                                        type="text"
                                        placeholder="Giá trị đơn hàng tối thiểu"
                                    />
                                </div>

                                <div className={cx('add-voucher-row')}>
                                    <p>Ngày hết hạn</p>
                                    <input id="new-voucher-endDate" type="date" placeholder="Giá trị tối đa" />
                                </div>

                                <div className={cx('add-voucher-buttons')}>
                                    <Button
                                        color="info"
                                        variant="contained"
                                        onClick={() => {
                                            let data = {
                                                discountCode: document.getElementById('new-voucher-code')?.value,
                                                discountValue:
                                                    Number(document.getElementById('new-voucher-value')?.value) / 100,
                                                maxPossibleValue:
                                                    document.getElementById('new-voucher-maximum-value')?.value,
                                                minCondition: document.getElementById('new-voucher-condition')?.value,
                                                endDate: document.getElementById('new-voucher-endDate')?.value,
                                            };
                                            handleAddVoucher(data);
                                        }}
                                    >
                                        Thêm Voucher
                                    </Button>
                                    <Button onClick={handleCloseAddVoucher}>Đóng</Button>
                                </div>
                            </div>
                        </div>
                        {/* </Loading> */}
                    </Modal>
                </div>

                <VoucherTable
                    columns={columns}
                    rows={rows}
                    rowPerPage={6}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdateVoucher}
                />
            </div>
        </Loading>
    );
}

export default Vouchers;
