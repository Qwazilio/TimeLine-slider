import React from "react";
import styled, { css } from "styled-components";
import {colors} from "@/theme/colors";

interface CircleArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction?: "left" | "right";
    size?: number;       // диаметр круга
    lineLength?: number; // длина линии стрелки
    lineWidth?: number;  // толщина линии
    offset?: number;     // вертикальное смещение
    arrowColor?: string;
}

export default function CircleArrow({
        direction = "right",
        size = 40,
        lineLength = 10,
        lineWidth = 3,
        offset = 1,
        arrowColor = colors.textPrimary,
        ...rest
    }: CircleArrowProps) {
    return (
        <Circle size={size} {...rest}>
            <Arrow mirror={direction === "left"} lineLength={lineLength} lineWidth={lineWidth}>
                <ArrowLineTop lineLength={lineLength} lineWidth={lineWidth} offset={offset} color={arrowColor}/>
                <ArrowLineBottom lineLength={lineLength} lineWidth={lineWidth} offset={offset} color={arrowColor} />
            </Arrow>
        </Circle>
    );
}

const Circle = styled.button<{ size: number }>`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border: 1px solid ${colors.borderButton};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    background: transparent;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

interface ArrowProps {
    mirror?: boolean;
    lineLength: number;
    lineWidth: number;
}

const Arrow = styled.div<ArrowProps>`
    position: relative;
    user-select: none;
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
    color: string;
}

const ArrowLineBase = css<ArrowLineProps>`
    position: absolute;
    width: ${({ lineLength }) => lineLength}px;
    height: ${({ lineWidth }) => lineWidth}px;
    background: ${({ color }) => color};
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