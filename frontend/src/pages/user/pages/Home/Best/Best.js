import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBestProducts } from '~/redux/Customers/Product/Action';
const cx = classNames.bind(styles);

function Best() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBestProducts());
    }, [dispatch]);

    const productsState = useSelector((state) => state.customerProducts);

    console.log('best', productsState.products);
    return (
        <div className={cx('element-wrapper')}>
            {productsState.products.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default Best;
