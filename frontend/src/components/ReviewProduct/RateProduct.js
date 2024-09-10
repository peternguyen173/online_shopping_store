import { Button, Divider, Grid, Rating, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
//   import { createReview } from "~/redux/Customers/Review/Action";
// import { useDispatch, useSelector } from "react-redux";
//   import { findProductById } from "~/redux/Customers/Product/Action";
import styles from './RateProduct.module.scss';
import { ShopContext } from '~/context/ShopContext';
import { Flex } from 'antd';
import { API_BASE_URL } from '~/config/api';
import axios from 'axios';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10); // Chuyển đổi chuỗi thành số nguyên
    return number.toLocaleString('en-US');
};

const RateProduct = () => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [rating, setRating] = useState();
    // const isLargeScreen = useMediaQuery("(min-width:1200px)");
    // // const dispatch = useDispatch();
    // const { customersProduct } = useSelector((store) => store);
    const { customersProduct } = useContext(ShopContext);
    const { orderItemId, orderId } = useParams();
    const navigate = useNavigate();
    const isLoading = useRef(false);
    const orderItem = useRef(null);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        isLoading.current = true;
        const getProduct = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/orders/${orderId}/items/${orderItemId}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                console.log(res.data, 'product');
                orderItem.current = res.data;
                isLoading.current = false;
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [orderItemId, orderId]);

    const handleRateProduct = (e, value) => {
        console.log('rating ----- ', value);
        setRating(value);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({ title: '', description: '' });
        const createReview = async () => {
            try {
                const res = await axios.post(
                    `${API_BASE_URL}/api/order/${orderId}/order-items/${orderItemId}/review`,
                    { ratingValue: rating, comment: formData.description },
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    },
                );
                console.log(res.data, 'review');
                navigate(`/products/${orderItem.current?.productId}`);
            } catch (error) {
                console.log(error);
            }
        };
        createReview();
    };

    return (
        !isLoading.current && (
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Rate & Review Product</h1>
                <Grid sx={{ justifyContent: 'center', gap: '5rem' }} container>
                    <Grid className={cx('product-info')} item xs={12} lg={4} sx={{ display: 'flex' }}>
                        <div className={cx('df')}>
                            <div>
                                <img className={cx('product-img')} src={orderItem.current?.thumbnail} alt="" />
                            </div>
                            <div className={cx('product-content')}>
                                <p className={cx('product-title')}>{orderItem.current?.productName} </p>
                                <p>Price: {numberWithCommas(orderItem.current?.price)}đ</p>
                                <p>Size: {orderItem.current?.size}</p>
                                <p>Color: {orderItem.current?.color}</p>
                                {/* <div className={cx('vote-container')}>
                                    <Rating name="read-only" value={4.6} precision={0.5} readOnly />
                                </div> */}
                                <div>
                                    <p className={cx('statusProduct')}>
                                        <FiberManualRecordIcon
                                            sx={{ width: '15px', height: '15px', color: 'green', mr: 2 }}
                                            className="text-green-600  mr-2"
                                        />
                                        <span>Delivered On Mar 03</span>{' '}
                                    </p>
                                    <p className="text-xs">Your Item Has Been Delivered</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <div className={`${!true ? 'py-10' : ''} space-y-5`}>
                            <div className="shadow-md border rounded-md p-5">
                                <Typography className="font-semibold" component="legend">
                                    Rate This Product
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        handleRateProduct(event, newValue);
                                    }}
                                />
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5 p-5 shadow-md border rounded-md">
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.title}
                                    onChange={handleChange}
                                    name="title"
                                />

                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Submit Review
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    );
};

export default RateProduct;
