import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styled from "styled-components";

export interface TimelineSliderNode{
    title: string;
    description: string;
}
interface TimelineSliderProps{
    nodes?: TimelineSliderNode[];
}
export default function TimelineSlider({nodes}: TimelineSliderProps){
    return (
        <div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>
                    <div>2021</div>
                    <div style={{maxWidth: "15vw"}}>13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды</div>
                </SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </div>
    )
}