import React, {JSX, useEffect, useState} from "react";
import {colors} from "@/theme/colors";
import {
    AxisX,
    AxisY,
    Circle, TimeLineBtn, TimelineBtnCircle,
    TimeLineBtnContainer,
    TimeLineBtnGhost, TimeLineBtnLabel,
    Year
} from "@/components/timeline/TimelineCircle.styled";

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
    startYear: number;
    endYear: number;
}
export default function TimelineCircle({
        activeTimeline,
        setActiveTimeline,
        size = 40,
        nodes,
        startYear,
        endYear,
    } : TimelineCircleProps) {
    const [rotation, setRotation] = useState(0);

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
                    {startYear || "XXXX"}
                </Year>
                {/* Правая дата */}
                <Year style={{color: colors.accentSecondary}} side={"right"}>
                    {endYear || "XXXX"}
                </Year>
                <AxisX/> <AxisY/>
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


