import styled from "styled-components";
import {colors} from "@/theme/colors";

export const  Circle = styled.div`
    border-radius: 100%;
    border: 1px solid ${colors.borderPrimary};
    width: 40%;
    height: 40%;
    aspect-ratio: 1 / 1;
    position: relative;
`;
export const  AxisX = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 1px;
    background: ${colors.textPrimary};
    opacity: 0.2;
    transform: translate(-50%, -50%);
`;
export const  AxisY = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    height: 200vh;
    width: 1px;
    background: ${colors.textPrimary};
    opacity: 0.2;
    transform: translate(-50%, -50%);
`;
export const  Year = styled.div<{side: string}>`
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
}`

export const  TimelineBtnCircle = styled.button<{
    size: number;
    active: boolean;
}>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;

    border: 1px solid ${colors.borderButton};
    border-radius: 50%;

    display: grid;
    place-items: center;

    position: absolute;
    inset: 50% auto auto 50%;

    transform: translate(-50%, -50%)
    scale(${({ active }) => (active ? 1 : 0)});

    background: ${colors.bgNodeCircle};

    transition: transform 0.45s cubic-bezier(.4,0,.2,1);
    pointer-events: none;
`;

export const  TimeLineBtnGhost = styled.div<{size: number, rotation: number}>`
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

export const  TimeLineBtnLabel = styled.div<{active: boolean}>`
    position: absolute;
    top: 50%;
    left: 100%;
    user-select: none;
    transform: translate(50%, -50%);
    transition: 0.5s ease;
    scale: ${({active}) => active ? 1 : 0};
    opacity: ${({active}) => active ? 1 : 0};
`;

export const  TimeLineBtn = styled.button`
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


export const  TimeLineBtnContainer = styled.div<{ rotation: number}>`
    position: absolute;
    inset: 0;
    transition: transform 0.5s ease;
    transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`;