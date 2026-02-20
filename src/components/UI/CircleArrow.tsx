import React from "react";
import styled, { css } from "styled-components";

interface CircleArrowProps {
    direction?: "left" | "right";
    size?: number;       // диаметр круга
    lineLength?: number; // длина линии стрелки
    lineWidth?: number;  // толщина линии
    offset?: number;     // костыль на вертикальное смещение
}

export default function CircleArrow({
        direction = "right",
        size = 40,
        lineLength = 10,
        lineWidth = 3,
        offset = 1,
    }: CircleArrowProps) {
    return (
        <Circle size={size}>
            <Arrow mirror={direction === "left"} lineLength={lineLength} lineWidth={lineWidth}>
                <ArrowLineTop lineLength={lineLength} lineWidth={lineWidth} offset={offset} />
                <ArrowLineBottom lineLength={lineLength} lineWidth={lineWidth} offset={offset} />
            </Arrow>
        </Circle>
    );
}

// Стили

const Circle = styled.button<{ size: number }>`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border: 1px solid rgba(66, 86, 122, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
`;

interface ArrowProps {
    mirror?: boolean;
    lineLength: number;
    lineWidth: number;
}

const Arrow = styled.div<ArrowProps>`
    position: relative;
    width: ${({ lineLength }) => lineLength}px;
    height: ${({ lineLength }) => lineLength}px;
    ${({ mirror }) =>
    mirror &&
    css`
        transform: scaleX(-1);
    `}
`;

interface ArrowLineProps {
    lineLength: number;
    lineWidth: number;
    offset: number;
}

const ArrowLineBase = css<ArrowLineProps>`
    position: absolute;
    width: ${({ lineLength }) => lineLength}px;
    height: ${({ lineWidth }) => lineWidth}px;
    background: #42567A;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`;

const ArrowLineTop = styled.div<ArrowLineProps>`
    ${ArrowLineBase};
    transform: translateY(calc(-50% + ${({ offset }) => 
            offset}px)) rotate(45deg);
    transform-origin: right center;
`;

const ArrowLineBottom = styled.div<ArrowLineProps>`
    ${ArrowLineBase};
    transform: translateY(calc(-50% - ${({ offset }) => 
            offset}px)) rotate(-45deg);
    transform-origin: right center;
`;