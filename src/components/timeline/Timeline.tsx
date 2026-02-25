import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import TimelineSlider, { TimelineSliderNode } from "@/components/timeline/TimelineSlider";
import TimelineCircle, { TimelineCircleNode } from "@/components/timeline/TimelineCircle";
import TimeLineCircleMobile from "@/components/timeline/TimeLineCircleMobile";
import CircleArrow from "@/components/UI/CircleArrow";
import {useCounterAnimation} from "@/hook/useCounterAnimated";
import {
    Arrows,
    BottomLeftControls,
    Container,
    Counter, GradientLine, MobileControlsWrapper, SliderDots,
    TimelineHeader, TopSection,
    Wrapper
} from "@/components/timeline/Timeline.styled";

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
    const paginationRef = useRef<HTMLDivElement | null>(null);
    const startYear = useCounterAnimation(
        nodes[activeTimeline]?.circleNode?.yearStart || 0
    );
    const endYear = useCounterAnimation(
        nodes[activeTimeline]?.circleNode?.yearEnd || 0
    );

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
                {nodes.length > 0 ? (
                    <>
                        <TopSection>
                            {!isMobile ? (
                                <TimelineCircle
                                    activeTimeline={activeTimeline}
                                    setActiveTimeline={setActiveTimeline}
                                    nodes={nodes.map(n => n.circleNode)}
                                    startYear={startYear}
                                    endYear={endYear}
                                />
                            ) : (
                                <TimeLineCircleMobile
                                    startYear={startYear}
                                    endYear={endYear}
                                    title={nodes[activeTimeline].circleNode.title}
                                />
                            )}

                            {!isMobile && renderControls()}
                        </TopSection>

                        <TimelineSlider
                            activeTimeline={activeTimeline}
                            isMobile={isMobile}
                            slides={nodes.map(n => n.slides)}
                            paginationEl={paginationRef}
                        />

                        {isMobile && (
                            <MobileControlsWrapper>
                                {renderControls()}
                                <SliderDots ref={paginationRef} />
                            </MobileControlsWrapper>
                        )}
                    </>
                ) :
                    <div style={{textAlign: "center", margin: "10%", fontSize: 50}}>Здесь пока пусто =(</div>
                }
            </Container>
        </Wrapper>
    );
}