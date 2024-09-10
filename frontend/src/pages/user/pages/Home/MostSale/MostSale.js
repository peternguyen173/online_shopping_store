import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSaleProducts } from '~/redux/Customers/Product/Action';

const cx = classNames.bind(styles);

function MostSale() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSaleProducts());
    }, [dispatch]);

    const productsState = useSelector((state) => state.customerProducts);
    console.log('mostsale', productsState.products);

    return (
        <div className={cx('element-wrapper')}>
            {productsState.products.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default MostSale;
