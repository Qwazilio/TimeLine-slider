import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {colors} from "@/theme/colors";
import {useCounterAnimation} from "@/hook/useCounterAnimated";

export interface TimelineCircleNode{
    title?: string;
    yearStart?: number;
    yearEnd?: number;
}
interface TimelineCircleProps {
    size?: number;
    nodes: TimelineCircleNode[];
    activeTimeline: number;
    setActiveTimeline: React.Dispatch<React.SetStateAction<number>>;
}
export default function TimelineCircle({
        activeTimeline,
        setActiveTimeline,
        size = 40,
        nodes,
    } : TimelineCircleProps) {
    const [rotation, setRotation] = useState(0);
    const startYear = useCounterAnimation(
        nodes[activeTimeline].yearStart || 0
    );
    const endYear = useCounterAnimation(
        nodes[activeTimeline].yearEnd || 0
    );

    const changeRotation = (index: number) => {
        const step = 360 / nodes.length;
        setRotation(-index * step + 0.001); //0.001 для избавления от блюра
    };

    const handleClick = (index: number) => {
        setActiveTimeline(index);
    };

    useEffect(() => {
        changeRotation(activeTimeline)
    }, [activeTimeline]);

    return (
        <Circle>
            {/* Левая дата */}
            <Year style={{color: colors.accentPrimary}} side={"left"}>
                {nodes[activeTimeline].yearStart ? startYear : "XXXX"}
            </Year>
            {/* Правая дата */}
            <Year style={{color: colors.accentSecondary}} side={"right"}>
                {nodes[activeTimeline].yearEnd ? endYear : "XXXX"}
            </Year>
            <AxisX/>
            <AxisY/>

            <TimeLineBtnContainer rotation={rotation}>
                {nodes.map((node: TimelineCircleNode, index: number) => {
                    const radius = 50; // на границу круга
                    const step = 360 / nodes.length;
                    const baseOffset = 60; // начало с π/3
                    const angle = (step * index - baseOffset) * (Math.PI / 180);
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);

                    return (
                        <TimeLineBtnGhost
                            key={index}
                            size={size}
                            rotation={rotation}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                            }}
                            onClick={() => handleClick(index)}
                        >
                            <TimeLineBtn>
                                <TimelineBtnCircle
                                    size={size}
                                    active={index === activeTimeline}
                                >
                                    {index + 1}
                                </TimelineBtnCircle>
                            </TimeLineBtn>
                            <TimeLineBtnLabel active={index === activeTimeline}>
                                {node.title || ""}
                            </TimeLineBtnLabel>
                        </TimeLineBtnGhost>
                    );
                })}
            </TimeLineBtnContainer>
        </Circle>
    )
}


const Circle = styled.div`
    border-radius: 100%;
    border: 1px solid ${colors.borderPrimary};
    width: 40%;
    height: 40%;
    aspect-ratio: 1 / 1;
    position: relative;
`;
const AxisX = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 1px;
    background: ${colors.textPrimary};
    opacity: 0.2;
    transform: translate(-50%, -50%);
`;
const AxisY = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    height: 200vh;
    width: 1px;
    background: ${colors.textPrimary};
    opacity: 0.2;
    transform: translate(-50%, -50%);
`;
const Year = styled.div<{side: string}>`
    position: absolute;
    top: 50%;
    font-size: 150px;
    cursor: default;
    user-select: none;
    ${({ side }) =>
    side === "left"
        ? `
        left: 0;
        transform: translate(-50%, -50%);
      `
        : `
        right: 0;
        transform: translate(50%, -50%);
      `};    
    
    @media (max-width: 1200px) {
        font-size: 90px;
    };    
    @media (max-width: 768px) {
        font-size: 56px;
    };
}`

const TimelineBtnCircle = styled.div<{size: number, active: boolean}>`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border: 1px solid ${colors.borderButton};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) 
    scale(${({active}) => active ? 1 : 0});
    background: ${colors.bgNodeCircle};
    transition: 0.5s ease; /* плавная анимация */
    pointer-events: none;
`;

const TimeLineBtnGhost = styled.div<{size: number, rotation: number}>`
    position: absolute;
    z-index: 1;
    transform: translate(-50%, -50%) rotate(${({rotation}) => -rotation}deg);
    background: transparent;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    aspect-ratio: 1/1;
    cursor: pointer;
    transition: 0.5s ease; /* плавная анимация */
    &:hover ${TimelineBtnCircle} {
        transform: translate(-50%, -50%) scale(1);
    }
`

const TimeLineBtnLabel = styled.div<{active: boolean}>`
    position: absolute;
    top: 50%;
    left: 100%;
    user-select: none;
    transform: translate(50%, -50%);
    transition: 0.5s ease;
    scale: ${({active}) => active ? 1 : 0};
    opacity: ${({active}) => active ? 1 : 0};
`;

const TimeLineBtn = styled.button`
    position: absolute;
    cursor: pointer;
    width: 10px;
    height: 10px;
    aspect-ratio: 1/1;
    border-radius: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    background: ${colors.textPrimary};
    border: none;
    user-select: none;
`;

const TimeLineBtnContainer = styled.div<{ rotation: number}>`
    position: absolute;
    inset: 0;
    transition: transform 0.5s ease;
    transform: ${({ rotation }) => `rotate(${rotation}deg)`};

    @media (max-width: 1024px) {
        display: none;
    };
`;