import Slider from 'react-slick';
import { Image } from 'antd';

function SliderComponent({ arrImage }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Slider {...settings}>
            {arrImage.map((image) => {
                return <Image src={image} alt="img" preview={false} width="100%" height="" />;
            })}
        </Slider>
    );
}

export default SliderComponent;
