import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode, Navigation, Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styled from "styled-components";

const dates = [
    '01 Jan',
    '01 Feb',
    '01 Mar',
    '01 Apr',
    '01 May',
    '01 Jun',
];

const Circle = styled.div`
    border-radius: 100%;
    border: 5px solid #42567A;
    width: 25%;
    height: 25%;
    aspect-ratio: 1 / 1;
`;
const AxisX = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgb(194, 194, 213);
    transform: translateY(-50%);
    z-index: -9999;
`;

const AxisY = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    width: 2px;
    background: rgb(194, 194, 213);
    transform: translateX(-50%);
    z-index: -9999;
`;

export default function DateSlider() {


    return (
        <div>
            <div>
                <div>
                    <div>
                        <h1>Исторические <br />даты</h1>
                    </div>
                    <Circle>
                        <AxisX></AxisX>
                        <AxisY></AxisY>
                    </Circle>

                </div>
                <div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}