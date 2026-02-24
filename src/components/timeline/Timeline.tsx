import styled from "styled-components";
import { useEffect, useState } from "react";

import TimelineSlider, { TimelineSliderNode } from "@/components/timeline/TimelineSlider";
import TimelineCircle, { TimelineCircleNode } from "@/components/timeline/TimelineCircle";
import TimeLineCircleMobile from "@/components/timeline/TimeLineCircleMobile";
import CircleArrow from "@/components/UI/CircleArrow";

import { colors } from "@/theme/colors";

export interface TimelineNode {
    circleNode: TimelineCircleNode;
    slides: TimelineSliderNode[];
}

interface TimelineProps {
    nodes: TimelineNode[];
}

export default function Timeline({ nodes }: TimelineProps) {
    const [activeTimeline, setActiveTimeline] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // безопасный доступ к window
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const nextTimeline = () => {
        setActiveTimeline(prev =>
            prev >= nodes.length - 1 ? 0 : prev + 1
        );
    };

    const prevTimeline = () => {
        setActiveTimeline(prev =>
            prev <= 0 ? nodes.length - 1 : prev - 1
        );
    };

    const renderControls = () => (
        <BottomLeftControls>
            <Counter>
                {String(activeTimeline + 1).padStart(2, "0")}/
                {String(nodes.length).padStart(2, "0")}
            </Counter>

            <Arrows>
                <CircleArrow
                    size={isMobile ? 30 : 40}
                    direction="left"
                    onClick={prevTimeline}
                    disabled={activeTimeline === 0}
                />

                <CircleArrow
                    size={isMobile ? 30 : 40}
                    onClick={nextTimeline}
                    disabled={activeTimeline === nodes.length - 1}
                />
            </Arrows>
        </BottomLeftControls>
    );

    return (
        <Wrapper>
            <Container>
                <TimelineHeader>
                    <GradientLine />
                    <span>
                        Исторические <br />
                        даты
                    </span>
                </TimelineHeader>

                <TopSection>
                    {!isMobile ? (
                        <TimelineCircle
                            activeTimeline={activeTimeline}
                            setActiveTimeline={setActiveTimeline}
                            nodes={nodes.map(n => n.circleNode)}
                        />
                    ) : (
                        <TimeLineCircleMobile
                            activeTimeline={activeTimeline}
                            nodes={nodes.map(n => n.circleNode)}
                        />
                    )}

                    {!isMobile && renderControls()}
                </TopSection>

                <TimelineSlider
                    activeTimeline={activeTimeline}
                    isMobile={isMobile}
                    slides={nodes.map(n => n.slides)}
                />

                {isMobile && (
                    <MobileControlsWrapper>
                        {renderControls()}
                        <SliderDots className="swiper-pagination-custom" />
                    </MobileControlsWrapper>
                )}

            </Container>
        </Wrapper>
    );
}

/* ----------------------------
   Styled Components
----------------------------- */

const Wrapper = styled.div`
    padding: 0 5%;
    position: relative;

    font-family: "PT Sans", serif;
    line-height: 1.2;

    overflow: hidden;
    margin: 1em 0;

    color: ${colors.textPrimary};
    font-weight: bold;
    background: transparent;

    @media (max-width: 768px) {
        padding: 0 2.5%;
    }
`;

const Container = styled.div`
    position: relative;

    border: 1px solid rgba(66, 86, 122, 0.2);
    padding: 5% 0;
    width: 100%;

    overflow: hidden;

    @media (max-width: 768px) {
        border: none;
        padding: 0;
        position: static;
    }
`;

const TopSection = styled.div`
    position: relative;

    display: flex;
    justify-content: center;

    margin-bottom: 5%;

    @media (max-width: 768px) {
        justify-content: space-between;
        width: 100%;
        margin: 0;
    }
`;

const TimelineHeader = styled.div`
    position: absolute;
    left: 0;

    padding-left: 5%;
    font-size: 56px;

    @media (max-width: 1200px) {
        position: inherit;
        font-size: 40px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        padding: 0;
    }
`;

const GradientLine = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    width: 5px;
    height: 100%;

    background: linear-gradient(
            ${colors.accentPrimary},
            ${colors.accentSecondary}
    );

    @media (max-width: 768px) {
        display: none;
    }
`;

const BottomLeftControls = styled.div`
    position: absolute;
    left: 5%;
    bottom: 0;

    z-index: 10;

    @media (max-width: 768px) {
        position: static;
    }
`;

const MobileControlsWrapper = styled.div`
    position: relative;
    margin: 10% 0;
`;

const Counter = styled.div`
    margin: 10px;
    letter-spacing: 0.05em;
`;

const Arrows = styled.div`
    display: flex;
    gap: 8px;
`;

const SliderDots = styled.div`
    display: flex;
    width: 50% !important;
    justify-content: center;

    position: absolute;
    top: 50% !important;
    left: 50% !important;

    transform: translate(-50%, -50%) !important;
`;