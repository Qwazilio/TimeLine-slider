import styled from "styled-components";
import TimelineSlider, {TimelineSliderNode} from "@/components/timeline/TimelineSlider";
import CircleArrow from "@/components/UI/CircleArrow";
import TimelineCircle, {TimelineCircleNode} from "@/components/timeline/TimelineCircle";
import {useState} from "react";
import {colors} from "@/theme/colors";

export interface TimelineNode {
    circleNode: TimelineCircleNode;
    slides: TimelineSliderNode[];
}

interface TimelineProps {
    nodes: TimelineNode[];
}
export default function Timeline({nodes}: TimelineProps) {
    const [activeTimeline, setActiveTimeline] = useState(0);

    const nextActiveTimeline = () => {
        if (activeTimeline >= nodes.length - 1) {
            setActiveTimeline(0);
        } else setActiveTimeline(activeTimeline + 1);
    }

    const prevActiveTimeline = () => {
        if (activeTimeline <= 0) {
            setActiveTimeline(nodes.length - 1);
        } else setActiveTimeline(activeTimeline - 1);
    }

    return (
        <Wrapper>
            <Container>
                <TimelineHeader>
                    <GradientLine />
                    <div>Исторические <br/>даты</div>
                </TimelineHeader>
                <TopSection>
                    <TimelineCircle
                        activeTimeline={activeTimeline}
                        setActiveTimeline={setActiveTimeline}
                        nodes={nodes.map(item => item.circleNode)}
                    />
                    <BottomLeftControls>
                        <Counter>0{activeTimeline + 1}/0{nodes.length}</Counter>
                        <Arrows>
                            <CircleArrow
                                onClick={prevActiveTimeline}
                                disabled={activeTimeline === 0}
                                direction={"left"}
                            />
                            <CircleArrow
                                onClick={nextActiveTimeline}
                                disabled={activeTimeline === nodes.length - 1}
                            />
                        </Arrows>
                    </BottomLeftControls>
                </TopSection>
                <TimelineSlider
                    activeTimeline={activeTimeline}
                    slides={nodes.map(item => item.slides)}
                />
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 0 10%;
    position: relative;
    font-family: 'PT Sans',serif;
    line-height: 1.2;
    overflow: hidden;
    margin: 1em 0;
    color: ${colors.textPrimary};
    font-weight: bold;
    background: transparent;
`;

const Container = styled.div`
    position: relative;
    border: 1px solid rgba(66, 86, 122, 0.2);
    padding: 5% 0;
    overflow: hidden;
`;

const TopSection = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
`;

const TimelineHeader = styled.div`
    position: absolute;
    left: 0;
    padding-left: 5%;
    font-size: 56px;
    
    @media (max-width: 1200px) {
        position: inherit;
        font-size: 40px;
    };

    @media (max-width: 768px) { 
        font-size: 20px;
    };
`;

const GradientLine = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(${colors.accentPrimary}, ${colors.accentSecondary});

    @media (max-width: 768px) {
        display: none;
    };
`;

const BottomLeftControls = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    padding-left: 5%;

    @media (max-width: 1024px) {
        display: none;
    };
`;

const Counter = styled.div`
    margin: 10px;
`;

const Arrows = styled.div`
    display: flex;
`;