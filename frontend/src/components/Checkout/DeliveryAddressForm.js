import * as React from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '~/redux/Customers/Order/Action';
import styles from './DeliveryAddressForm.module.scss';
import classNames from 'classnames/bind';
import AddressCard from '../AddressCard/AddressCard';
import { useState } from 'react';
import { ShopContext } from '~/context/ShopContext';
import { getUserProfiles } from '~/redux/Auth/Action';
import { useEffect } from 'react';
import { useRef } from 'react';
import axiosCLient from '~/api/axiosClient';
import { API_BASE_URL } from '~/config/api';

const cx = classNames.bind(styles);

export default function DeliveryAddressForm({ handleNext }) {
    const { deliveryAddress } = React.useContext(ShopContext);
    const [submittedAddress, setSubmittedAddress] = useState(null);
    const [deliveryAddressCalled, setDeliveryAddressCalled] = useState(false);
    const address = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userProfiles } = useSelector((store) => store.auth);
    const jwt = localStorage.getItem('jwt');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const req = {
            name: data.get('firstName') + data.get('lastName'),
            address:
                data.get('address') + ', ' + data.get('ward') + ', ' + data.get('district') + ', ' + data.get('city'),
            phoneNumber: data.get('phoneNumber'),
        }
        handleNext(req);
    };

    useEffect(() => {
        async function getData() {
            try {
                dispatch(getUserProfiles(jwt));
                //console.log('cart here', cart);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [jwt, dispatch]);

    useEffect(() => {
        if (userProfiles) {
            console.log(userProfiles);
            address.current = userProfiles;
        }
        console.log('here', address.current);
    }, [userProfiles]);

    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   const data = new FormData(event.currentTarget);
    //   // eslint-disable-next-line no-console

    //   const address = {
    //     firstName: data.get("firstName"),
    //     lastName: data.get("lastName"),
    //     streetAddress: data.get("address"),
    //     city: data.get("city"),
    //     district: data.get("district"),
    //     ward: data.get("ward"),
    //     mobile: data.get("phoneNumber"),
    //   };

    //   dispatch(createOrder({ address, jwt, navigate }));
    //   // after perfoming all the opration
    //   handleNext();
    // };

    // const handleCreateOrder = (item) => {
    //   dispatch(createOrder({ address: item, jwt, navigate }));
    //   handleNext();
    // };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} lg={5}>
                <Box className={cx('left-container')}>
                    {/* Code ghép API */}
                    {/* {auth.user?.addresses.length > 0 ? (
            auth.user.addresses.map((item) => (
              <div
                onClick={() => setSelectedAdress(item)}
                className={cx('selectedAddress')}
              >
                {" "}
                <AddressCard address={address} />
                {selectedAddress?.id === item.id && (
                  <Button
                    sx={{ mt: 2 }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => handleCreateOrder(item)} 
                  >
                    Deliver Here
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div>
              Bạn chưa có địa chỉ, vui lòng thêm địa chỉ mới
            </div>
          )} */}

                    {/* Code chạy thử */}
                    {address.current?.length > 0 ? (
                        address.current.map((item) => (
                            <div className={cx('selectedAddress')}>
                                {' '}
                                <AddressCard address={item} />
                                <Button
                                    sx={{ mt: 2 }}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        handleNext(item);
                                    }}
                                >
                                    Deliver Here
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div>Bạn chưa có địa chỉ, vui lòng thêm địa chỉ mới</div>
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} lg={7}>
                <Box className={cx('form-control')}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="Họ"
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Tên"
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address"
                                    name="address"
                                    label="Địa chỉ"
                                    fullWidth
                                    autoComplete="shipping address"
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="Tỉnh/Thành Phố"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required id="district" name="district" label="Quận/Huyện" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required id="ward" name="ward" label="Xã/Phường " fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Số điện thoại"
                                    fullWidth
                                    autoComplete="tel"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    sx={{ padding: '.9rem 1.5rem' }}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Deliverd Here
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}
