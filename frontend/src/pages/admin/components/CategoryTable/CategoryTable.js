import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './CategoryTable.module.scss';
import { Image, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function CategoryTable({ columns, rows, rowPerPage, handleDelete, handleUpdate }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);

    const [openDeleteBox, setOpenDeleteBox] = useState([]);
    const [openCategoryUpdateBox, setOpenCategoryUpdateBox] = useState([]);

    const [categoryName, setCategoryName] = useState([]);
    const [categoryThumbnail, setCategoryThumbnail] = useState(Array(rows.length).fill(null));
    const [categoryThumbnailPreview, setCategoryThumbnailPreview] = useState(Array(rows.length).fill(null));

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

    const handleOpenCategoryUpdateBox = (index) => {
        setOpenCategoryUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
        // Initialize the category name and thumbnail arrays
        setCategoryName((prev) => {
            const newState = [...prev];
            newState[index] = rows[index].categoryName;
            return newState;
        });
        setCategoryThumbnail((prev) => {
            const newState = [...prev];
            newState[index] = rows[index].thumbnail;
            return newState;
        });

        setCategoryThumbnailPreview((prev) => {
            const newState = [...prev];
            newState[index] = rows[index].thumbnail;
            return newState;
        });
    };

    const handleCloseCategoryUpdateBox = (index) => {
        setOpenCategoryUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const handleCategoryThumbnailChange = (index) => (fileInfo) => {
        if (fileInfo.file.status === 'error') {
            const file = fileInfo.file.originFileObj;
            const fileUrl = URL.createObjectURL(file);

            setCategoryThumbnail((prev) => {
                const newState = [...prev];
                newState[index] = file;
                return newState;
            });

            setCategoryThumbnailPreview((prev) => {
                const newState = [...prev];
                newState[index] = fileUrl;
                return newState;
            });
        }
    };

    const handleUpdateCategory = (index) => {
        handleUpdate({
            ...rows[index],
            categoryName: categoryName[index],
            thumbnail: categoryThumbnail[index],
        });
        handleCloseCategoryUpdateBox(index);
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
                                <StyledTableCell align="left">{row?.categoryName}</StyledTableCell>
                                <StyledTableCell align="left">{row.quantity}</StyledTableCell>

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
                                            <p>Xóa danh mục {row.categoryName} ?</p>
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
                                        onClick={() => handleOpenCategoryUpdateBox(row.index - 1)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Cập nhật
                                    </Button>
                                    <Modal
                                        open={openCategoryUpdateBox[row.index - 1]}
                                        onClose={() => handleCloseCategoryUpdateBox(row.index - 1)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <div className={cx('update-modal-box')}>
                                            <p className={cx('update-modal-title')}>Cập nhật danh mục</p>

                                            <div className={cx('update-input-wrapper')}>
                                                <div className={cx('update-input-row')}>
                                                    <p>Tên danh mục:</p>
                                                    <input
                                                        id={`category-name-${row.index - 1}`}
                                                        type="text"
                                                        value={categoryName[row.index - 1] || ''}
                                                        onChange={(e) =>
                                                            setCategoryName((prev) => {
                                                                const newState = [...prev];
                                                                newState[row.index - 1] = e.target.value;
                                                                return newState;
                                                            })
                                                        }
                                                    />
                                                </div>

                                                <div className={cx('update-input-row')}>
                                                    <p>Thumbnail:</p>

                                                    <div className={cx('input-thumbnail')}>
                                                        <Upload
                                                            onChange={handleCategoryThumbnailChange(row.index - 1)}
                                                            showUploadList={false}
                                                        >
                                                            <button className={cx('add-image-btn')}>
                                                                <UploadOutlined />
                                                                Chọn ảnh
                                                            </button>
                                                        </Upload>

                                                        {categoryThumbnailPreview[row.index - 1] && (
                                                            <Image
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '50%',
                                                                    objectFit: 'contain',
                                                                }}
                                                                alt=""
                                                                src={categoryThumbnailPreview[row.index - 1]}
                                                                preview={false}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={cx('update-modal-buttons')}>
                                                <Button
                                                    size="large"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleUpdateCategory(row.index - 1)}
                                                >
                                                    Cập nhật
                                                </Button>
                                                <Button
                                                    size="large"
                                                    variant="outlined"
                                                    onClick={() => handleCloseCategoryUpdateBox(row.index - 1)}
                                                >
                                                    Hủy
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal>
                                </TableCell>
                            </TableRow>
                        ))}
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

export default CategoryTable;
