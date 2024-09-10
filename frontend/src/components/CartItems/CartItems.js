import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CartItems.module.scss';
import remove_icon from '~/assets/images/cart_cross_icon.png';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeCartItem } from '~/redux/Customers/Cart/Action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10); // Chuyển đổi chuỗi thành số nguyên
    return number.toLocaleString('en-US');
};
function CartItems() {
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const [voucher, setVoucher] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    // const [cart, setCart] = useState(null);
    const isLoading = useRef(false);
    const [cartUpdated, setCartUpdated] = useState(false);
    useEffect(() => {
        async function getCartData() {
            try {
                isLoading.current = true;
                dispatch(getCart(jwt));
                setCartUpdated(false);
            } catch (error) {
                console.log(error);
            }
        }
        getCartData();
    }, [jwt, cartUpdated]);

    useEffect(() => {
        if (cart) {
            console.log(cart);
            isLoading.current = false;
        }
    }, [cart]);

    const handleVoucherChange = (event) => {
        setVoucher(event.target.value);
    };

    const handleVoucherSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/cart/discounts', voucher, {
                headers: {
                    'Content-Type': 'text/plain',
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setAppliedVoucher(response.data);
            setErrorMessage(null);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('Voucher invalid!');
            } else {
                console.error(error);
            }
        }
    };

    const handleVoucherRemove = async () => {
        try {
            await axios.delete('http://localhost:8080/api/cart/discounts', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setAppliedVoucher(null);
            setErrorMessage(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCurrentVoucher = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cart/discounts', {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setAppliedVoucher(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCurrentVoucher();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('format-main')}>
                <p>Sản phẩm</p>
                <p>Tên</p>
                <p>Đơn giá</p>
                <p>Kích thước</p>
                <p>Số lượng</p>
                <p>Màu sắc</p>
                <p>Thành tiền</p>
                <p>Xóa</p>
            </div>
            <hr />

            {!isLoading.current && cart?.cartItemList?.length ? (
                cart.cartItemList.map((cartItem) => {
                    return (
                        <div key={cartItem.cartItemId}>
                            <div key={`${cartItem.cartItemId}-${cartItem.size}`}>
                                <div className={cx('cartItems-format', 'format-main')}>
                                    <img
                                        src={cartItem.thumbnail}
                                        alt={cartItem.productName}
                                        className={cx('product-icon')}
                                    />
                                    <p>{cartItem.productName}</p>
                                    {/* <p>{cartItem.discountPrice ? cartItem.discountPrice : cartItem.price}₫</p> */}
                                    <p>{cartItem.productPrice}₫</p>
                                    <p> {cartItem.size}</p>
                                    <p className={cx('quantity')}> {cartItem.quantity}</p>
                                    <div className={cx('color-item')} style={{ backgroundColor: cartItem.color }}></div>
                                    <p>{numberWithCommas(cartItem.discountPrice)}₫</p>
                                    <img
                                        src={remove_icon}
                                        alt="Remove item"
                                        className={cx('cart-remove-icon')}
                                        onClick={async () => {
                                            await dispatch(removeCartItem({ cartItemId: cartItem.cartItemId, jwt }));
                                            setCartUpdated(true);
                                        }}
                                    />
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
                })
            ) : (
                <div className="cart-empty">Giỏ hàng trống</div>
            )}
            <div className={cx('cartitems-down')}>
                <div className={cx('cartitems-total')}>
                    <h1>Tổng thanh toán</h1>
                    <div>
                        <div className={cx('cartitems-total-item')}>
                            <p>Giá trị sản phẩm</p>
                            <p>{numberWithCommas(cart?.totalDiscountPrice)}₫</p>
                        </div>
                        <hr />
                        <div className={cx('cartitems-total-item')}>
                            <p>Phí vận chuyển</p>
                            <p>25,000đ</p>
                        </div>
                        <hr />
                        <div className={cx('cartitems-total-item')}>
                            <h3>Tổng</h3>
                            <h3>{numberWithCommas(cart?.totalDiscountPrice + 25000)}₫</h3>
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate('/checkout?step=2')}
                        variant="contained"
                        type="submit"
                        sx={{
                            padding: '.8rem 2rem',
                            marginTop: '2rem',
                            width: '50%',
                            backgroundColor: '#ff5a5a',
                            fontSize: '1.25rem',
                        }}
                        className={cx('btn-cart')}
                    >
                        PROCESS TO CHECKOUT
                    </Button>
                </div>
                <div className={cx('cartitems-promocode')}>
                    <p>Nếu bạn có mã giảm giá, hãy áp dụng vào đây</p>
                    <div className={cx('cartitems-promobox')}>
                        <input type="text" placeholder="Voucher" value={voucher} onChange={handleVoucherChange} />
                        <button className={cx('btn-promo')} onClick={handleVoucherSubmit}>
                            SUBMIT
                        </button>
                    </div>
                    {appliedVoucher && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p>{appliedVoucher.discountCode}</p>
                            <button onClick={handleVoucherRemove}>X</button>
                        </div>
                    )}
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default CartItems;
