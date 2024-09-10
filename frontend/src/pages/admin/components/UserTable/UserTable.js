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
import styles from './UserTable.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function UserTable({ columns, rows, rowPerPage, handleDelete }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);

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
                                    <StyledTableCell align="left">{row?.email}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row?.userDetailList[0].name ? row?.userDetailList[0].name : 'Chưa đặt tên'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row?.userDetailList[0].phoneNumber
                                            ? row?.userDetailList[0].phoneNumber
                                            : 'Chưa đặt SĐT'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row?.role === 'ADMIN' ? 'Admin' : 'Người dùng'}
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
                                                <p>Xóa mã người dùng {row?.email} ?</p>
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

export default UserTable;
