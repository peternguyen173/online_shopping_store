import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShopCategory from './ShopCategory';
import categoryApi from '~/api/categoryApi';
const cx = classNames.bind(styles);

function Products() {
    const [menu, setMenu] = useState(1);
    const [categories, setCategories] = useState(null);
    const handleDisplayMenu = (index) => setMenu(index);

    useEffect(() => {
        async function getCategoryData() {
            try {
                const categoriesResponse = await categoryApi.getAll();
                setCategories(categoriesResponse);
                console.log(categoriesResponse);
            } catch (error) {
                console.log(error);
            }
        }
        getCategoryData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cate-filter')}>
                <div className={cx('category')}>
                    <p>Loại sản phẩm</p>
                    <div className={cx('category-detail')}>
                        {categories?.map((category) => {
                            return (
                                <Link to="#">
                                    <Button
                                        className={cx('category-nav', {
                                            'category-nav-active': menu === category.categoryId,
                                        })}
                                        children={category.categoryName}
                                        onClick={() => handleDisplayMenu(category.categoryId)}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className={cx('filter')}></div>
            </div>

            <div className={cx('products-body')}>
                {categories?.map(
                    (category) => menu === category.categoryId && <ShopCategory categoryId={category.categoryId} />,
                )}
            </div>
        </div>
    );
}

export default Products;
