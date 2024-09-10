import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    const newPrice = data?.discountPrice;
    const oldPrice = data?.price;
    console.log('price', newPrice, oldPrice);
    return (
        <Link to={`/products/${data.productId}`} className={cx('wrapper')}>
            <img className={cx('img')} src={data.thumbnail} alt="" />
            <p className={cx('name')}>{data.productName}</p>
            <div className={cx('price')}>
                {oldPrice ? (
                    <>
                        <p className={cx('new-price')}>{newPrice.toLocaleString('vn-VN') + ' đ'}</p>
                        <p className={cx('old-price')}>{oldPrice.toLocaleString('vn-VN') + ' đ'}</p>
                    </>
                ) : (
                    <p className={cx('new-price')}>{newPrice.toLocaleString('vn-VN') + ' đ'}</p>
                )}
            </div>
        </Link>
    );
}

export default ProductItem;
