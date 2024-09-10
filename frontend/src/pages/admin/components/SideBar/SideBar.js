import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBar({ data }) {
    const location = useLocation();
    
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('container')}>
                {data.map((item, key) => {
                    const isActive = location.pathname === item.link;
                    return (
                        <li key={key}>
                            <NavLink
                                to={item.link}
                                className={cx('sideBar-item', { active: isActive })}
                                // className={({ isActive }) => {
                                //     console.log(key, isActive);
                                //     const linkClasses = [cx('sideBar-item')];
                                //     if (isActive) linkClasses.push(cx('active'));
                                //     return linkClasses.join(' ');
                                // }}
                            >
                                <div className={cx('sideBar-item-icon')}>{item.icon}</div>
                                <div className={cx('sideBar-item-title')}>{item.title}</div>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBar;
