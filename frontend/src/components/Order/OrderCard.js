import { Box, Grid, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AdjustIcon from '@mui/icons-material/Adjust';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import classNames from 'classnames/bind';
import styles from './OrderCard.module.scss';
import { ShopContext } from '~/context/ShopContext';
const cx = classNames.bind(styles);

// Orders:Mảng chứa các order có dạng
// {
// 	         orderId: 1, tăng dần
//           items: [{ id: itemId (id_ product), size, quantity, color },....]
//           address: selectedAddress,
//           orderStatus: 'Pending'
//         };

const OrderCard = ({ order }) => {
    console.log(order);
    const navigate = useNavigate();
    // const {getOrderByOrderId, getProductById} = useContext(ShopContext);
    return (
        <div onClick={() => navigate(`/account/order/${order.orderId}`)}>
            <Box className={cx('wrapper')}>
                <Grid spacing={2} container sx={{ justifyContent: 'space-between' }}>
                    <Grid item xs={6}>
                        <div
                            // onClick={() => navigate(`/account/order/${order?.id}`)}
                            className={cx('orderCard')}
                        >
                            <img
                                className="w-[5rem] h-[5rem] object-cover object-top"
                                src={order?.orderItemList?.[0]?.thumbnail}
                                alt=""
                            />
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>{order?.orderItemList?.[0]?.productName}</p> {/*title*/}
                                <p className={cx('item-size')}>
                                    <span>Size: {order?.orderItemList?.[0]?.size}</span> {/* {item?.size} */}
                                </p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={2}>
                        <p>{order?.orderItemList?.[0]?.price}</p> {/*item?.price*/}
                    </Grid>
                    <Grid item xs={4}>
                        <p className="space-y-2 font-semibold">
                            {/*order?.orderStatus === "DELIVERED" thay vào true*/}
                            {order?.orderStatus === 'DELIVERED' ? (
                                <>
                                    <FiberManualRecordIcon
                                        sx={{ width: '15px', height: '15px' }}
                                        className={cx('icon-status')}
                                    />
                                    <span>Delivered On Mar 03</span>
                                </>
                            ) : (
                                <>
                                    <AdjustIcon sx={{ width: '15px', height: '15px' }} className={cx('icon-status')} />
                                    <span>Expected Delivery On Mar 03</span>
                                </>
                            )}
                        </p>
                        <p className="text-xs">Your Item Has Been Delivered</p>
                        {/* {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )} */}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default OrderCard;
