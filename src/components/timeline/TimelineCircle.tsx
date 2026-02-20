import styled from "styled-components";

const Circle = styled.div`
    border-radius: 100%;
    border: 1px solid rgba(66, 86, 122, 0.2);
    width: 40%;
    height: 40%;
    aspect-ratio: 1 / 1;
    position: relative;
    z-index: 0;
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


const TimeLineBtn = styled.div`
    z-index: 1;
    cursor: pointer;
`

export default function TimelineCircle() {
    return (
        <Circle>
            {/* Левая точка */}
            <Year side={"left"}>2001</Year>
            {/* Правая точка */}
            <Year side={"right"}>2006</Year>
            <AxisX/>
            <AxisY/>
            {Array.from({length: 6}).map((_, index: number) => {
                const radius = 0.5; // половина ширины круга
                const angle = (2 * Math.PI * index) / 6 - Math.PI; // Начало с PI
                const x = 50 + radius * 100 * Math.cos(angle); // в процентах
                const y = 50 + radius * 100 * Math.sin(angle); // в процентах

                return (
                    <TimeLineBtn
                        key={index}
                        style={{
                            position: 'absolute',
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {index}
                    </TimeLineBtn>
                );
            })}
        </Circle>
    )
}