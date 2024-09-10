import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { ShopContext } from '~/context/ShopContext';
import styles from './ShopCategory.module.scss';
import ProductItem from '~/components/ProductItem';
import productApi from '~/api/productApi';
const cx = classNames.bind(styles);

function ShopCategory(props) {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        async function getProductData() {
            try {
                const productsResponse = await productApi.getAll();
                setProducts(productsResponse);
                console.log(productsResponse);
            } catch (error) {
                console.log(error);
            }
        }
        getProductData();
    }, []);

    return (
        <div className={cx('shop-category')}>
            <div className={cx('shopcategory-products')}>
                {products?.map((item, index) => {
                    if (props.categoryId === item.category.categoryId) {
                        return <ProductItem key={index} data={item} />;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className={cx('shopcategory-loadmore')}>Hiện thị thêm sản phẩm</div>
        </div>
    );
}

export default ShopCategory;
