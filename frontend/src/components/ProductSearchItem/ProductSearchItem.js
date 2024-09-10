import classNames from 'classnames/bind';
import styles from './ProductSearchItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductSearchItem({data}) {
    return (
        <Link to={`/products/${data.productId}`} className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.thumbnail} alt="" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.productName}</span>
                </h4>
                {/* <span className={cx('username')}>{data.nickname}</span> */}
            </div>
        </Link>
    );
}

export default ProductSearchItem;
