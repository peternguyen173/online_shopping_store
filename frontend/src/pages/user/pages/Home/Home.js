import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import homeImage from '~/assets/images/home';
import Button from '~/components/Button';
import MostSale from '~/pages/user/pages/Home/MostSale';
import Best from '~/pages/user/pages/Home/Best';
import NewProducts from '~/pages/user/pages/Home/NewProducts';
import Blog from './Blog';
import SliderComponent from '~/components/Slider/Slider';
import { HomeMenuTab } from '~/util/constant';

const cx = classNames.bind(styles);

function Home() {
    const [displayElement, setDisplayElement] = useState(HomeMenuTab.MostSale);

    const handleDisplayElement = (index) => {
        setDisplayElement(index);
    };

    const sliderImages = [homeImage.banner1, homeImage.banner2, homeImage.banner3];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <SliderComponent arrImage={sliderImages} />
            </div>

            <div className={cx('products')}>
                <div className={cx('products-header')}>
                    <Button
                        className={cx('home-product-nav', { 'home-product-nav-active': displayElement === 0 })}
                        children="Giảm nhiều"
                        onClick={() => handleDisplayElement(HomeMenuTab.MostSale)}
                    />
                    <Button
                        className={cx('home-product-nav', { 'home-product-nav-active': displayElement === 1 })}
                        children="Hàng mới"
                        onClick={() => handleDisplayElement(HomeMenuTab.NewProducts)}
                    />
                    <Button
                        className={cx('home-product-nav', { 'home-product-nav-active': displayElement === 2 })}
                        children="Tốt nhất"
                        onClick={() => handleDisplayElement(HomeMenuTab.Best)}
                    />
                </div>

                <div className={cx('products-body')}>
                    {displayElement === HomeMenuTab.MostSale && <MostSale />}
                    {displayElement === HomeMenuTab.NewProducts && <NewProducts />}
                    {displayElement === HomeMenuTab.Best && <Best />}
                </div>
            </div>
            <Blog />
        </div>
    );
}

export default Home;
