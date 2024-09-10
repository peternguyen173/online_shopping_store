import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import home_images from '~/assets/images/home'

const cx = classNames.bind(styles);

function Blog() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('title')}>Blog</h1>
                <div className={cx('body')}>
                    <div className={cx('blog-item')}>
                        <img className={cx('blog-img')} src={home_images.blog1} alt=""/>
                    </div>
                    <div className={cx('blog-item')}>
                        <img className={cx('blog-img')} src={home_images.blog2} alt=""/>
                    </div>
                    <div className={cx('blog-item')}>
                        <img className={cx('blog-img')} src={home_images.blog3} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
