import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
import { Image, Input, Upload, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '~/redux/Admin/Category/Action';
import * as message from '~/components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent/Loading';
import CategoryTable from '../../components/CategoryTable';

const cx = classNames.bind(styles);
const jwt = localStorage.getItem('jwt');

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'avatar', label: 'Ảnh', minWidth: 60 },
    { id: 'name', label: 'Tên danh mục', minWidth: 200 },
    {
        id: 'quantity',
        label: 'Số sản phẩm',
        minWidth: 50,
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
        minWidth: 50,
        align: 'left',
    },
];

function CategoriesManagement() {
    const [categoryName, setCategoryName] = useState('');
    const [categoryThumbnail, setCategoryThumbnail] = useState(null);
    const [categoryThumbnailPreview, setCategoryThumbnailPreview] = useState('');
    const [isSubmittingAddCategory, setIsSubmittingAddCategory] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();
    const categoriesState = useSelector((state) => state.categories);

    const isLoading = categoriesState.loading;
    const isError = categoriesState.error;

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const rows = categoriesState.categories.map((element, index) => {
        const totalQuantity = element.productList?.reduce((acc, product) => acc + product.quantityInStock, 0);
        return {
            ...element,
            quantity: !totalQuantity ? 0 : totalQuantity,
            index: index + 1,
        };
    });
    console.log('rows', rows);

    const handleOnChangeCategoryThumbnail = (fileInfo) => {
        if (fileInfo.file.status === 'error') {
            setCategoryThumbnail(fileInfo.file.originFileObj);
            setCategoryThumbnailPreview(URL.createObjectURL(fileInfo.file.originFileObj));
        }
    };

    const handleRemoveCategoryThumbnail = () => {
        setCategoryThumbnail(null);
        setCategoryThumbnailPreview('');
    };

    const handleAddCategory = () => {
        const newCategory = new FormData();

        newCategory.append('categoryName', categoryName);
        if (categoryThumbnail) {
            newCategory.append('thumbnail', categoryThumbnail);
        }

        dispatch(createCategory({ data: newCategory, jwt }));
        setIsSubmittingAddCategory(true);
    };

    useEffect(() => {
        if (isSubmittingAddCategory && !categoriesState.loading) {
            if (categoriesState.error) {
                message.error('Thêm danh mục thất bại, chưa nhập đúng các trường thông tin hoặc lỗi đường truyền');
            } else {
                message.success('Thêm danh mục mới thành công!');
                setIsModalVisible(false);
            }
            setIsSubmittingAddCategory(false);
        }
    }, [isSubmittingAddCategory, categoriesState.loading, categoriesState.error]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (category) => {
        dispatch(deleteCategory(category)).then(() => {
            dispatch(getAllCategories());
        });
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    const handleUpdate = (category) => {
        console.log('update category', category);

        const data = new FormData();

        data.append('categoryName', category.categoryName);
        if (category.thumbnail) {
            data.append('thumbnail', category.thumbnail);
        }

        dispatch(updateCategory(data, category.categoryId, jwt)).then(() => {
            dispatch(getAllCategories());
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
                <h1 className={cx('title')}>Danh mục sản phẩm</h1>
                <div className={cx('show-add-category-modal')} onClick={showModal}>
                    <AddCircleIcon />
                    <span>Thêm danh mục</span>
                </div>

                <CategoryTable
                    columns={columns}
                    rows={rows}
                    rowPerPage={6}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />

                <Modal
                    width={700}
                    title="Thêm danh mục mới"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="submit" variant="contained" type="primary" onClick={handleAddCategory}>
                            Thêm danh mục
                        </Button>,
                    ]}
                >
                    <Loading isLoading={isLoading}>
                        <div className={cx('add-category-input')}>
                            <div className={cx('category-input-item')}>
                                <span className={cx('category-input-label')}>Tên danh mục</span>
                                <Input
                                    placeholder="Nhập tên danh mục"
                                    onChange={(e) => {
                                        setCategoryName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className={cx('category-input-item')}>
                                <span className={cx('category-input-label')}>Ảnh đại diện</span>
                                <div className={cx('input-thumbnail')}>
                                    <Upload onChange={handleOnChangeCategoryThumbnail} showUploadList={false}>
                                        <button className={cx('add-image-btn')}>
                                            <UploadOutlined />
                                            Chọn ảnh
                                        </button>
                                    </Upload>

                                    {categoryThumbnail && (
                                        <Image className={cx('image-item')} alt="" src={categoryThumbnailPreview} />
                                    )}

                                    {categoryThumbnail && (
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            size="small"
                                            onClick={handleRemoveCategoryThumbnail}
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Loading>
                </Modal>
            </div>
        </Loading>
    );
}

export default CategoriesManagement;
