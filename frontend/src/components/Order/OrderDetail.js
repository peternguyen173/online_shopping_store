import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useRef } from 'react';
import OrderTraker from './OrderTraker';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';

import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import AddressCard from '../AddressCard/AddressCard';
import { getOrderById } from '~/redux/Customers/Order/Action';
const cx = classNames.bind(styles);
const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const { order } = useSelector((store) => store.customersOrders);
    const isLoading = useRef(false);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        isLoading.current = true;
        const getOrder = async () => {
            dispatch(getOrderById({ orderId: param.orderId, jwt }));
        };
        getOrder();
    }, [dispatch, jwt, param.orderId]);

    useEffect(() => {
        if (order) {
            console.log(order);
            isLoading.current = false;
        }
    }, [order]);
    return (
        <div className={cx('wrapper')}>
            <Grid container className="p-3 shadow-lg">
                <Grid xs={12}>
                    <p className={cx('address')}>Delivery Address</p>
                </Grid>
                <Grid item xs={6}>
                    <AddressCard address={order?.userDetail} />
                </Grid>
            </Grid>
            <Box className={cx('stepContainer')}>
                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Grid item xs={9}>
                        <OrderTraker activeStep={3} />{' '}
                        {/*order.order?.orderStatus === "PLACED"
              ? 1
              : order.order?.orderStatus === "CONFIRMED"
              ? 2
              : order.order?.orderStatus === "SHIPPED"
              ? 3
  : 5 thay vào 3 */}
                    </Grid>
                    {/* <Grid item>
                        {order.order?.orderStatus === 'DELIVERED' && (
                            <Button sx={{ color: '' }} color="error" variant="text">
                                RETURN
                            </Button>
                        )}

                        {order.order?.orderStatus !== 'DELIVERED' && (
                            <Button sx={{ color: deepPurple[500] }} variant="text">
                                cancel order
                            </Button>
                        )}
                    </Grid> */}
                </Grid>
            </Box>

            <Grid container className={cx('containerOrderItem')}>
                {/* {order.order?.orderItems.map((item) => ( */}
                {order?.orderItemList?.map((item) => (
                    <Grid
                        container
                        item
                        className={cx('cardOrder')}
                        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <Grid item xs={6}>
                            {' '}
                            <div className={cx('cardItem')}>
                                {/*{item?.product.imageUrl} thay vào src*/}
                                <img className={cx('cartImg')} src={item.thumbnail} alt="" />
                                <div className={cx('cardContent')}>
                                    <p className="">{item.productName}</p> {/*{item.product.title}*/}
                                    <p className={cx('cardText')}>
                                        <span>{item.color}</span> <span>{item.size}</span> {/*item.size*/}
                                    </p>
                                    <p>Seller: HUSTORE</p>
                                    <p>{item.price}đ</p> {/*item.price*/}
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            {/*${item.product.id} thêm vào sau rate/ */}
                            {
                                <Box
                                    onClick={() => navigate(`/account/rate/${item.orderId}/${item.orderItemId}`)}
                                    sx={{ color: deepPurple[500] }}
                                    className={cx('box-rate')}
                                >
                                    <StarIcon sx={{ fontSize: '2rem' }} className={cx('star-icon')} />
                                    <span>{`Rate & Review Product ${item.productId}`}</span>
                                </Box>
                            }
                        </Grid>
                    </Grid>
                ))}

                {/* ))} */}
            </Grid>
        </div>
    );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;
