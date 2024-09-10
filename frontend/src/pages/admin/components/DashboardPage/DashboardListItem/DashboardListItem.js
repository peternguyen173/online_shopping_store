import classNames from 'classnames/bind';
import styles from './DashboardListItem.module.scss';

const cx = classNames.bind(styles);

function NewCustomerItem({ img, row1, row2 }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={img} alt="" />
            <div className={cx('right')}>
                <span className={cx('row1')}>{row1}</span>
                <span className={cx('row2')}>{row2}</span>
            </div>
        </div>
    );
}

export default NewCustomerItem;
