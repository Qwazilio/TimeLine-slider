import styled from "styled-components";
import {useEffect, useState} from "react";

interface TimelineCircleProps {
    size?: number;       // диаметр круга
}
export default function TimelineCircle({
        size = 40,
    } : TimelineCircleProps) {
    const total = 6;
    const [rotation, setRotation] = useState(0);
    const [active, setActive] = useState(0);

    const handleClick = (index: number) => {
        setActive(index);
        const currentAngle = (2 * Math.PI * index) / total - Math.PI;
        const newRotation = Math.PI - currentAngle;
        setRotation(newRotation);
    };

    useEffect(() => {
        handleClick(0);
    }, []);

    return (
        <Circle>
            {/* Левая точка */}
            <Year side={"left"}>2001</Year>
            {/* Правая точка */}
            <Year side={"right"}>2006</Year>
            <AxisX/>
            <AxisY/>
            <TimeLineBtnContainer rotation={rotation}>
                {Array.from({length: 6}).map((_, index: number) => {
                    const radius = 0.5; // половина ширины круга
                    const angle = (2 * Math.PI * index) / 6 - Math.PI/3; // Начало с PI
                    const x = 50 + radius * 100 * Math.cos(angle); // в процентах
                    const y = 50 + radius * 100 * Math.sin(angle); // в процентах

                    return (
                        <div style={{

                        }}>
                            <TimeLineBtnGhost
                                key={index}
                                size={size}
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: `translate(-50%, -50%) rotate(${-rotation}rad)`,
                                }}
                                onClick={() => handleClick(index)}
                            >
                                <TimeLineBtn>
                                    <TimelineBtnCircle
                                        size={size}
                                        style={{
                                            transform: index === active ? "translate(-50%, -50%) scale(1)" : "",
                                        }}
                                    >
                                        {index}
                                    </TimelineBtnCircle>
                                </TimeLineBtn>
                                <TimeLineBtnLabel
                                    style={{
                                        opacity: index === active ? "1": "0",
                                        scale: index === active ? "1" : "0",
                                    }}
                                >
                                    Наука
                                </TimeLineBtnLabel>
                            </TimeLineBtnGhost>

                        </div>

                    );
                })}
            </TimeLineBtnContainer>

        </Circle>
    )
}


const Circle = styled.div`
    border-radius: 100%;
    border: 1px solid rgba(66, 86, 122, 0.2);
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
    background: #42567A;
    opacity: 0.2;
    transform: translate(-50%, -50%);
`;
const AxisY = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    height: 100vw;
    width: 1px;
    background: #42567A;
    opacity: 0.2;
    transform: translate(-50%, -50%);
`;

const Year = styled.div<{side: string}>`
    position: absolute;
    top: 50%;
    font-size: 200px;
    font-weight: bold;
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
      `
}`

const TimelineBtnCircle = styled.div<{size: number}>`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border: 1px solid rgba(66, 86, 122, 0.5);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: white;
    transition: 0.5s ease; /* плавная анимация */
    pointer-events: none;
`;

const TimeLineBtnGhost = styled.div<{size: number}>`
    position: absolute;
    z-index: 1;
    transform: translate(-50%, -50%);
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

const TimeLineBtnLabel = styled.div`
    position: absolute;
    top: 50%;
    left: 100%;
    user-select: none;
    transform: translate(50%, -50%);
    transition: 0.5s ease;
`

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
    background: #42567A;
    border: none;
    user-select: none;

`;

const TimeLineBtnContainer = styled.div<{ rotation: number}>`
    position: absolute;
    inset: 0;
    transition: transform 0.5s ease;
    transform: ${({ rotation }) => `rotate(${rotation}rad)`};

`;