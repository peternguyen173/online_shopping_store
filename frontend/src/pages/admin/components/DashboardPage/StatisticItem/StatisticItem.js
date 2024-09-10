import classNames from 'classnames/bind';
import styles from './StatisticItem.module.scss';

const cx = classNames.bind(styles);

function StatisticItem({ value, unit, title, img, backgroundImageColor }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <span className={cx('value')}>
                    {value} {unit}
                </span>
                <p className={cx('title')}>{title}</p>
            </div>

            <div style={{ backgroundColor: `${backgroundImageColor}` }} className={cx('image')}>
                <img src={img} alt="" />
            </div>
        </div>
    );
}

export default StatisticItem;
