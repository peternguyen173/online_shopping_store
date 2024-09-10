import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, MenuItem, Modal, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './OrderTable.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function OrderTable({ columns, rows, rowPerPage, handleUpdateStatus }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
    const [orderStatusArray, setOrderStatusArray] = useState(rows.map((row) => row.orderStatus));
    const [openDetailBox, setOpenDetailBox] = useState([]);

    const handleOpenDetailBox = (index) => {
        setOpenDetailBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseDetailBox = (index) => {
        setOpenDetailBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleStatusChange = (orderId, event) => {
        const newStatus = event.target.value;
        setOrderStatusArray((prevStatuses) => {
            const newState = prevStatuses.map((status, index) =>
                rows[index].orderId === orderId ? newStatus : status,
            );
            return newState;
        });
        handleUpdateStatus(newStatus, orderId);
    };

    const orderStatus = {
        CONFIRM_PAYMENT: 'Xác nhận thanh toán',
        CONFIRMED: 'Đã xác nhận',
        DELIVERED: 'Đã giao',
        SHIPPED: 'Đang giao',
        CANCELLED: 'Hủy',
    };

    return (
        <div className={cx('wrapper')}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ fontSize: '1.6rem', minWidth: `${column.minWidth}` }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            const date = new Date(row?.createdAt);
                            const createdDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, '0')}/${date.getFullYear()}`;
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <StyledTableCell align="left">{row.orderId}</StyledTableCell>
                                    <StyledTableCell align="left">{row.userDetail.name}</StyledTableCell>
                                    <StyledTableCell align="left">{createdDate}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.finalPrice.toLocaleString('vn-VN') + ' đ'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.orderStatus}</StyledTableCell>
                                    <StyledTableCell align="left">{row.paymentMethod}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {/* {row.PaymentMethod === 'NET_BANKING' ? row.PaymentStatus : ''} */}
                                        {row.paymentStatus}
                                    </StyledTableCell>

                                    <StyledTableCell align="left">
                                        <Select
                                            style={{ height: '36px' }}
                                            value={orderStatusArray[index]}
                                            onChange={(event) => handleStatusChange(row.orderId, event)}
                                        >
                                            {Object.entries(orderStatus).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </StyledTableCell>

                                    <StyledTableCell align="left">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            className={cx('order-detail-button')}
                                            onClick={() => handleOpenDetailBox(row.index - 1)}
                                        >
                                            Chi tiết
                                        </Button>
                                        <Modal
                                            open={openDetailBox[row.index - 1]}
                                            onClose={() => handleCloseDetailBox(row.index - 1)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className={cx('detail-modal-wrapper')}>
                                                <h1>Chi tiết đơn hàng</h1>
                                                <div className={cx('detail-modal-content')}>
                                                    <div className={cx('detail-user')}>
                                                        <h2 className={cx('detail-content-title')}>Thông tin khách hàng</h2>
                                                        <div>
                                                            <div>Họ tên: {row.userDetail.name}</div>
                                                            <div>Địa chỉ: {row.userDetail.address}</div>
                                                            <div>Số điện thoại: {row.userDetail.phoneNumber}</div>
                                                        </div>
                                                    </div>

                                                    <div className={cx('detail-products')}>
                                                        <h2 className={cx('detail-content-title')}>Danh sách sản phẩm</h2>
                                                        <div className={cx('detail-product-list')}>
                                                            {row?.orderItemList.map((product, index) => {
                                                                return (
                                                                    <div
                                                                        className={cx('detail-product-item')}
                                                                        key={index}
                                                                    >
                                                                        {index + 1 + '. '}
                                                                        <img
                                                                            className={cx('detail-product-image')}
                                                                            src={product.thumbnail}
                                                                            alt=""
                                                                        />
                                                                        <div>{product.productName}</div>
                                                                        <div>Số lượng: {product.quantity}</div>
                                                                        <div>
                                                                            Giá:{' '}
                                                                            {product.price.toLocaleString('vn-VN') +
                                                                                ' đ'}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    </StyledTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '50px',
                    fontSize: '1.4rem',
                    '.MuiTablePagination-selectLabel': {
                        color: 'rgb(41, 39, 39)',
                        fontSize: '1.4rem',
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '1.4rem',
                        marginBottom: 0,
                    },
                }}
                rowsPerPageOptions={[6]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
}

export default OrderTable;
