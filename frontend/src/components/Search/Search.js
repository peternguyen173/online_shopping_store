import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks/useDebounce';
import * as searchServices from '~/services/searchService';
import ProductSearchItem from '../ProductSearchItem/ProductSearchItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    console.log('searchResult', searchResult);

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult?.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Sản phẩm</h4>
                        {searchResult &&
                            searchResult.map((result) => <ProductSearchItem key={result.id} data={result} />)}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                <input
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    ref={inputRef}
                    type="text"
                    className={cx('input')}
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchValue}
                />
            </div>
        </HeadlessTippy>
    );
}

export default Search;
