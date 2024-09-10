import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, MenuItem, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './ProductTable.module.scss';
import { Image } from 'antd';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function ProductTable({ columns, rows, rowPerPage, handleDelete, handleUpdate }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);
    const [openProductUpdateBox, setOpenProductUpdateBox] = useState([]);
    const [productId, setProductId] = useState('');
    const [updatedProduct, setUpdatedProduct] = useState({
        productName: '',
        price: '',
        discountPrice: '',
        quantityInStock: '',
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const handleOpenProductUpdateBox = (index, row) => {
        setProductId(row.productId);
        setUpdatedProduct({
            productName: row.productName,
            category: row.category?.categoryName,
            price: row.price,
            discountPrice: row.discountPrice,
            quantityInStock: row.quantityInStock,
        });
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const handleInputChange = (field, value) => {
        setUpdatedProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdateClick = (index) => {
        handleUpdate(updatedProduct, productId);
        handleCloseProductUpdateBox(index);
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <StyledTableCell align="left">{row?.index}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Image
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                objectFit: 'contain',
                                            }}
                                            src={row?.thumbnail}
                                            alt=""
                                        />
                                    </StyledTableCell>

                                    <StyledTableCell align="left">{row?.productName}</StyledTableCell>

                                    <StyledTableCell align="left">{row?.category?.categoryName}</StyledTableCell>

                                    <StyledTableCell align="left">
                                        {row?.price.toLocaleString('vn-VN') + ' đ'}
                                    </StyledTableCell>

                                    <StyledTableCell align="left">{row?.quantityInStock}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row?.state === 0 ? 'Hết hàng' : 'Còn hàng'}
                                    </StyledTableCell>

                                    <TableCell align="left">
                                        <Button
                                            onClick={() => handleOpenDeleteBox(row.index - 1)}
                                            variant="contained"
                                            color="error"
                                        >
                                            XÓA
                                        </Button>
                                        <Modal
                                            open={openDeleteBox[row.index - 1]}
                                            onClose={() => handleCloseDeleteBox(row.index - 1)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className={cx('delete-confirm-box')}>
                                                <p>Xóa sản phẩm {row.productName} ?</p>
                                                <div className={cx('delete-box-row')}>
                                                    <Button
                                                        size="large"
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => {
                                                            handleDelete(row);
                                                            handleCloseDeleteBox(row.index - 1);
                                                        }}
                                                    >
                                                        Xóa
                                                    </Button>
                                                    <Button
                                                        size="large"
                                                        variant="outlined"
                                                        onClick={() => handleCloseDeleteBox(row.index - 1)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </TableCell>

                                    <TableCell align="left">
                                        <Button
                                            onClick={() => handleOpenProductUpdateBox(row.index - 1, row)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            CẬP NHẬT
                                        </Button>

                                        <Modal
                                            open={openProductUpdateBox[row.index - 1]}
                                            onClose={() => handleCloseProductUpdateBox(row.index - 1)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className={cx('update-modal-box')}>
                                                <p className={cx('update-modal-title')}>Cập nhật sản phẩm</p>

                                                <div className={cx('update-input-wrapper')}>
                                                    <div className={cx('update-input-row')}>
                                                        <p>Tên sản phẩm</p>
                                                        <input
                                                            type="text"
                                                            defaultValue={updatedProduct.productName}
                                                            onChange={(e) =>
                                                                handleInputChange('productName', e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Giá</p>
                                                        <input
                                                            type="number"
                                                            defaultValue={updatedProduct.price}
                                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Giá sau giảm</p>
                                                        <input
                                                            type="number"
                                                            defaultValue={updatedProduct.discountPrice}
                                                            onChange={(e) =>
                                                                handleInputChange('discountPrice', e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Số lượng hàng</p>
                                                        <input
                                                            type="number"
                                                            defaultValue={updatedProduct.quantityInStock}
                                                            onChange={(e) =>
                                                                handleInputChange('quantityInStock', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className={cx('update-modal-buttons')}>
                                                    <Button
                                                        color="info"
                                                        variant="contained"
                                                        onClick={() => handleUpdateClick(row.index - 1)}
                                                    >
                                                        Cập nhật
                                                    </Button>

                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => handleCloseProductUpdateBox(row.index - 1)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </TableCell>
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

export default ProductTable;
