import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './VoucherTable.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function VoucherTable({ columns, rows, rowPerPage, handleDelete, handleUpdate }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);
    const [openVoucherUpdateBox, setOpenVoucherUpdateBox] = useState([]);

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

    const handleOpenVoucherUpdateBox = (index) => {
        setOpenVoucherUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseVoucherUpdateBox = (index) => {
        setOpenVoucherUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
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
                            const date = new Date(row?.endDate);
                            const endDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, '0')}/${date.getFullYear()}`;

                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <StyledTableCell align="left">{row?.index}</StyledTableCell>
                                    <StyledTableCell align="left">{row?.discountCode}</StyledTableCell>
                                    <StyledTableCell align="left">{row?.discountValue * 100 + ' %'}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {'≥ ' + row?.minCondition.toLocaleString('vn-VN') + ' đ'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row?.maxPossibleValue.toLocaleString('vn-VN') + ' đ'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{endDate}</StyledTableCell>

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
                                                <p>Xóa mã giảm giá {row?.discountCode} ?</p>
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
                                            onClick={() => handleOpenVoucherUpdateBox(row.index - 1)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            CẬP NHẬT
                                        </Button>

                                        <Modal
                                            open={openVoucherUpdateBox[row.index - 1]}
                                            onClose={() => handleCloseVoucherUpdateBox(row.index - 1)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className={cx('update-modal-box')}>
                                                <p className={cx('update-modal-title')}>Cập nhật Voucher</p>

                                                <div className={cx('update-input-wrapper')}>
                                                    <div className={cx('update-input-row')}>
                                                        <p>Mã voucher</p>
                                                        <input
                                                            id={`voucher-code-${row.index - 1}`}
                                                            type="text"
                                                            defaultValue={row?.discountCode}
                                                            onChange={null}
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Giá trị (%)</p>
                                                        <input
                                                            id={`voucher-value-${row.index - 1}`}
                                                            type="text"
                                                            onChange={null}
                                                            defaultValue={row?.discountValue * 100}
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Điều kiện (≥ vnd)</p>
                                                        <input
                                                            id={`voucher-condition-${row.index - 1}`}
                                                            type="text"
                                                            onChange={null}
                                                            defaultValue={row?.minCondition}
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Giá trị tối đa (vnd)</p>
                                                        <input
                                                            id={`voucher-maximum-value-${row.index - 1}`}
                                                            type="text"
                                                            onChange={null}
                                                            defaultValue={row?.maxPossibleValue}
                                                        />
                                                    </div>

                                                    <div className={cx('update-input-row')}>
                                                        <p>Ngày hết hạn (DD/MM/YYYY)</p>
                                                        <input
                                                            id={`voucher-endDate-${row.index - 1}`}
                                                            type="text"
                                                            onChange={null}
                                                            defaultValue={endDate}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={cx('update-modal-buttons')}>
                                                    <Button
                                                        color="info"
                                                        variant="contained"
                                                        onClick={() => {
                                                            let data = {
                                                                discountCode: document.getElementById(
                                                                    `voucher-code-${row.index - 1}`,
                                                                )?.value,
                                                                discountValue:
                                                                    Number(
                                                                        document.getElementById(
                                                                            `voucher-value-${row.index - 1}`,
                                                                        )?.value,
                                                                    ) / 100,
                                                                endDate: document.getElementById(
                                                                    `voucher-endDate-${row.index - 1}`,
                                                                )?.value,
                                                                minCondition: document.getElementById(
                                                                    `voucher-condition-${row.index - 1}`,
                                                                )?.value,
                                                                maxPossibleValue: document.getElementById(
                                                                    `voucher-maximum-value-${row.index - 1}`,
                                                                )?.value,
                                                            };

                                                            handleUpdate(data, row.discountCodeId);
                                                            handleCloseVoucherUpdateBox(row.index - 1);
                                                        }}
                                                    >
                                                        Cập nhật
                                                    </Button>

                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => handleCloseVoucherUpdateBox(row.index - 1)}
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

export default VoucherTable;
