import classNames from 'classnames/bind';
import styles from './AddProducts.module.scss';
import { Checkbox, ColorPicker, Image, Input, Select, Upload } from 'antd';
import { Button } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '~/redux/Admin/Product/Action';
import { getAllCategories } from '~/redux/Admin/Category/Action';
import Loading from '~/components/LoadingComponent/Loading';
import * as message from '~/components/Message/Message';

const cx = classNames.bind(styles);
const { TextArea } = Input;

function AddProducts() {
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState([]);
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [colorInputs, setColorInputs] = useState([{ colorName: '#1677ff', imageList: [], imagePreviewList: [] }]);
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const categoriesState = useSelector((state) => state.categories);
    const productsState = useSelector((state) => state.products);

    const isCategoryLoading = categoriesState.loading;

    const isAddProductLoading = productsState.loading;
    const categoriesSelect = categoriesState.categories.map((category) => ({
        value: category.categoryId,
        label: category.categoryName,
    }));

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const jwt = localStorage.getItem('jwt');

    const handleChangeProductType = (value) => {
        setType(value);
    };

    const handleOnChangeProductThumbnail = (fileInfo) => {
        if (fileInfo.file.status === 'error') {
            setThumbnail(fileInfo.file.originFileObj);
            setThumbnailPreview(URL.createObjectURL(fileInfo.file.originFileObj));
        }
    };

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview('');
    };

    const handleChangeSize = (checkedValues) => {
        setSize(checkedValues);
    };

    const handleOnChangeProductImage = (fileInfo, colorIndex) => {
        if (fileInfo.file.status === 'error') {
            const updatedColorInputs = [...colorInputs];
            updatedColorInputs[colorIndex].imageList.push(fileInfo.file.originFileObj);
            updatedColorInputs[colorIndex].imagePreviewList.push(URL.createObjectURL(fileInfo.file.originFileObj));
            setColorInputs(updatedColorInputs);
        }
    };

    const handleAddColorInput = () => {
        setColorInputs([...colorInputs, { colorName: '#1677ff', imageList: [], imagePreviewList: [] }]);
    };

    const handleRemoveColor = (colorIndex) => {
        const updatedColorInputs = [...colorInputs];
        updatedColorInputs.splice(colorIndex, 1);
        setColorInputs(updatedColorInputs);
    };

    const handleRemoveImage = (colorIndex, imageIndex) => {
        const updatedColorInputs = [...colorInputs];
        updatedColorInputs[colorIndex].imageList.splice(imageIndex, 1);
        updatedColorInputs[colorIndex].imagePreviewList.splice(imageIndex, 1);
        setColorInputs(updatedColorInputs);
    };

    const resetForm = () => {
        setName('');
        setThumbnail(null);
        setThumbnailPreview('');
        setType('');
        setSize([]);
        setPrice('');
        setDiscountPrice('');
        setColorInputs([{ colorName: '#1677ff', imageList: [], imagePreviewList: [] }]);
        setQuantity('');
        setDescription('');
    };

    const handleAddProduct = () => {
        const newProduct = new FormData();

        newProduct.append('productName', name);
        newProduct.append('categoryId', type);

        if (thumbnail) {
            newProduct.append('thumbnail', thumbnail);
        }

        newProduct.append('sizeList', size);
        newProduct.append('price', price);
        newProduct.append('discountPrice', discountPrice);
        newProduct.append('quantityInStock', quantity);
        newProduct.append('description', description);

        colorInputs.forEach((colorInput, index) => {
            newProduct.append(`colorRequestDTOList[${index}].colorName`, colorInput.colorName);
            colorInput.imageList.forEach((file, fileIndex) => {
                newProduct.append(`colorRequestDTOList[${index}].imageList[${fileIndex}]`, file);
            });
        });

        setIsSubmitting(true);
        // Call api
        dispatch(createProduct({ data: newProduct, jwt }));

        // setIsSubmitting(false);
    };

    useEffect(() => {
        if (isSubmitting && !productsState.loading) {
            if (productsState.error) {
                message.error('Thêm sản phẩm thất bại, chưa nhập đúng các trường thông tin hoặc lỗi đường truyền');
            } else {
                message.success('Thêm sản phẩm mới thành công!');
                resetForm();
            }
            setIsSubmitting(false);
        }
    }, [isSubmitting, productsState.loading, productsState.error, name]);

    console.log(
        name,
        thumbnail,
        thumbnailPreview,
        type,
        size,
        price,
        discountPrice,
        colorInputs,
        quantity,
        description,
    );
    return (
        <Loading isLoading={isAddProductLoading}>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Thêm sản phẩm</h1>
                <div className={cx('container')}>
                    <div className={cx('input-wrapper')}>
                        <div className={cx('input-section')}>
                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Tên sản phẩm</span>
                                <Input
                                    value={name}
                                    placeholder="Nhập tên sản phẩm"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Ảnh đại diện</span>
                                <div className={cx('input-thumbnail')}>
                                    <Upload
                                        onChange={(fileInfo) => handleOnChangeProductThumbnail(fileInfo)}
                                        showUploadList={false}
                                    >
                                        <button className={cx('add-image-btn')}>
                                            <UploadOutlined />
                                            Chọn ảnh
                                        </button>
                                    </Upload>

                                    {thumbnail && <Image className={cx('image-item')} alt="" src={thumbnailPreview} />}

                                    {thumbnail && (
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            size="small"
                                            onClick={handleRemoveThumbnail}
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Phân loại</span>
                                <Loading isLoading={isCategoryLoading}>
                                    <Select
                                        defaultValue="Chọn loại sản phẩm"
                                        style={{
                                            minWidth: 500,
                                            maxWidth: 1000,
                                        }}
                                        onChange={handleChangeProductType}
                                        options={categoriesSelect}
                                    />
                                </Loading>
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Kích thước</span>
                                <div className={cx('input-size-checkbox-group')}>
                                    <Checkbox.Group onChange={handleChangeSize} value={size}>
                                        <Checkbox value="S">S</Checkbox>
                                        <Checkbox value="M">M</Checkbox>
                                        <Checkbox value="L">L</Checkbox>
                                        <Checkbox value="XL">XL</Checkbox>
                                    </Checkbox.Group>
                                </div>
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Giá</span>
                                <Input
                                    value={price}
                                    placeholder="Nhập giá sản phẩm"
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                />
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Giá sau giảm</span>
                                <Input
                                    value={discountPrice}
                                    placeholder="Nhập giá sản phẩm sau giảm"
                                    onChange={(e) => {
                                        setDiscountPrice(e.target.value);
                                    }}
                                />
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Số lượng</span>
                                <Input
                                    value={quantity}
                                    placeholder="Nhập số lượng sản phẩm"
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                />
                            </div>

                            <div className={cx('input-row')}>
                                <span className={cx('input-label')}>Mô tả</span>
                                <TextArea
                                    value={description}
                                    style={{ height: '60px' }}
                                    row={10}
                                    placeholder="Nhập mô tả sản phẩm"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>

                            <div className={cx('color-image-input-wrapper')}>
                                <span className={cx('input-label')}>Màu sắc</span>

                                <div className={cx('main-input-wrapper')}>
                                    {colorInputs.map((input, colorIndex) => (
                                        <div key={input.id} className={cx('main-input')}>
                                            <ColorPicker
                                                className={cx('color-picker')}
                                                defaultValue="#1677ff"
                                                onChange={(value, hex) => {
                                                    const updatedColorInputs = [...colorInputs];
                                                    updatedColorInputs[colorIndex].colorName = hex;
                                                    setColorInputs(updatedColorInputs);
                                                }}
                                            />

                                            <div className={cx('input-image')}>
                                                <Upload
                                                    onChange={(fileInfo) =>
                                                        handleOnChangeProductImage(fileInfo, colorIndex)
                                                    }
                                                    showUploadList={false}
                                                >
                                                    <button className={cx('add-image-btn')}>
                                                        <UploadOutlined />
                                                        Thêm ảnh
                                                    </button>
                                                </Upload>

                                                {input.imagePreviewList && (
                                                    <div className={cx('input-image-display')}>
                                                        {input.imagePreviewList.map((image, imageIndex) => (
                                                            <div key={imageIndex} className={cx('image-item-wrapper')}>
                                                                <Image
                                                                    className={cx('image-item')}
                                                                    alt=""
                                                                    src={image}
                                                                />
                                                                <Button
                                                                    color="secondary"
                                                                    variant="contained"
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleRemoveImage(colorIndex, imageIndex)
                                                                    }
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleRemoveColor(colorIndex)}
                                            >
                                                Xóa màu
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                style={{ width: '150px', marginLeft: '20%' }}
                                size="medium"
                                variant="outlined"
                                onClick={handleAddColorInput}
                            >
                                Thêm màu sắc
                            </Button>
                        </div>

                        {/* <img alt="" src={admin_images.add_product_image} /> */}
                    </div>

                    <div className={cx('add-product-btn')}>
                        <Button size="large" color="primary" variant="contained" onClick={handleAddProduct}>
                            Thêm sản phẩm
                        </Button>
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default AddProducts;
