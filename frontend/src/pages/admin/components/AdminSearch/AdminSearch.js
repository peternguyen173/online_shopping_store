import classNames from 'classnames/bind';
import styles from './AdminSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminSearch() {
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
            <input type="text" placeholder="Tìm kiếm..." className={cx('input')} />
        </div>
    );
}

export default AdminSearch;
