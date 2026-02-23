import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styled, {keyframes} from "styled-components";
import {colors} from "@/theme/colors";
import {useRef, useState} from "react";
import CircleArrow from "@/components/UI/CircleArrow";

export interface TimelineSliderNode{
    title?: string;
    description?: string;
}
interface TimelineSliderProps{
    slides: TimelineSliderNode[][];
    activeTimeline: number;
}
export default function TimelineSlider({
   slides = [],
   activeTimeline
}: TimelineSliderProps){
    const swiperRef = useRef<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const currentSlides = slides[activeTimeline] || [];
    const updateNavState = (swiper: any) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };


    return (
        <SliderWrapper key={activeTimeline}>
            {!isBeginning && (
                <CircleArrow
                    onClick={() => swiperRef.current?.slidePrev()}
                    direction="left"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        background: colors.bgNodeCircle,
                        boxShadow: `1px 1px 15px ${colors.shadowPrimary}`,
                    }}
                />
            )}
            {!isEnd && (
                <CircleArrow
                    onClick={() => swiperRef.current?.slideNext()}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 10,
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        background: colors.bgNodeCircle,
                        boxShadow: `0px 0px 15px ${colors.shadowPrimary}`,
                    }}
                />
            )}
            <Swiper
                slidesPerView={3}
                breakpoints={{
                    0: {
                        slidesPerView: 1.4
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1200: {
                        slidesPerView: 3
                    }
                }}
                style={{cursor: "pointer"}}
                spaceBetween={50}
                freeMode={true}
                modules={[FreeMode]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={updateNavState}
                onReachBeginning={updateNavState}
                onReachEnd={updateNavState}
            >
                {currentSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                            <SlideTitle>{slide.title}</SlideTitle>
                            <SlideDesc>{slide.description}</SlideDesc>
                    </SwiperSlide>
                ))}
            </Swiper>
        </SliderWrapper>
    )
}

const SlideTitle = styled.div`
    color: #5D5FEF;
    font-size: 20px;
`;
const SlideDesc = styled.div`
    margin-top: 15px;
    font-size: 20px;
    font-weight: normal;
`;
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const SliderWrapper = styled.div`
    position: relative;
    animation: ${fadeIn} 1s ease forwards;
    padding-left: 5%;
    padding-right: 5%;
`;