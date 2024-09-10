import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import { ShopContext } from '~/context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '~/components/ProductDisplay/ProductDisplay';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer/Footer';
import productApi from '~/api/productApi';
const cx = classNames.bind(styles);

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        async function getProductData() {
            try {
                const response = await productApi.getOne(productId);
                setProduct(response);
            } catch (error) {
                console.log(error);
            }
        }
        getProductData();
    }, [productId]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            {product && <ProductDisplay product={product} />}
            <Footer />
        </div>
    );
}

export default ProductDetail;
