import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts, updateProduct } from '~/redux/Admin/Product/Action';
import Loading from '~/components/LoadingComponent/Loading';
import * as message from '~/components/Message/Message';
import { getAllCategories } from '~/redux/Admin/Category/Action';
import ProductTable from '../../components/ProductTable';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 10 },
    { id: 'image', label: 'Hình ảnh', minWidth: 30 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 200, align: 'left' },
    {
        id: 'category',
        label: 'Phân loại',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'quantity',
        label: 'Số lượng',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'state',
        label: 'Trạng thái',
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
        minWidth: 30,
        align: 'left',
    },
];

function ProductsManagement() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllProducts());
    }, [dispatch]);

    const productsState = useSelector((state) => state.products);
    const categoriesState = useSelector((state) => state.categories);

    const isLoading = productsState.loading;
    const isError = productsState.error;

    const categoriesSelect = categoriesState.categories.map((category) => ({
        value: category.categoryId,
        label: category.categoryName,
    }));

    const rows = productsState.products.map((element, index) => ({
        ...element,
        index: index + 1,
        state: element.quantityInStock ? 1 : 0,
    }));

    const handleDelete = (product) => {
        console.log('delete product', product);
        dispatch(deleteProduct(product)).then(() => {
            dispatch(getAllProducts());
        });
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    const handleUpdate = (product, id) => {
        console.log('product', product, id);
        dispatch(updateProduct({ productId: id, product: product })).then(() => {
            dispatch(getAllProducts());
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
                <h1 className={cx('title')}>Danh sách sản phẩm</h1>
                <ProductTable
                    columns={columns}
                    rows={rows}
                    rowPerPage={6}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            </div>
        </Loading>
    );
}

export default ProductsManagement;
