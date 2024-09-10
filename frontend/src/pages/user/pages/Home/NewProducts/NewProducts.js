import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';
import newProducts from '~/assets/new_products';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewProducts } from '~/redux/Customers/Product/Action';
const cx = classNames.bind(styles);

function NewProducts() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewProducts());
    }, [dispatch]);

    const productsState = useSelector((state) => state.customerProducts);

    console.log('new', productsState.products);

    return (
        <div className={cx('element-wrapper')}>
            {productsState.products.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default NewProducts;
