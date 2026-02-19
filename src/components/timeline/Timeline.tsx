import styled from "styled-components";
import TimelineSlider from "@/components/timeline/TimelineSlider";
import Arrow from "@/components/UI/Arrow";

const Circle = styled.div`
    border-radius: 100%;
    border: 2px solid rgb(194, 194, 213);
    width: 25%;
    height: 25%;
    aspect-ratio: 1 / 1;
`;
const AxisX = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgb(194, 194, 213);
    transform: translateY(-50%);
`;
const AxisY = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    width: 2px;
    background: rgb(194, 194, 213);
    transform: translateX(-50%);
`;

export default function Timeline() {


    return (
        <div style={{ paddingLeft: "5em 0em", position: "relative", background: "#E5E5E5", padding: "0% 10%" }}>
            <div style={{position: "relative", border: "2px solid rgb(194, 194, 213)", padding: "5% 0%"}}>
                <AxisY />
                <AxisX />
                <div style={{ position: 'relative', display: "flex", justifyContent: "center" }}>
                    <div style={{position: 'absolute', left: 0}}>
                        <h1>Исторические <br />даты</h1>
                    </div>
                    <Circle />
                    <div style={{ position: 'absolute', left: 0, bottom: 0, display: "flex", justifyContent: "center" }}>
                        <Arrow />
                        <Arrow />
                    </div>
                </div>
                <TimelineSlider />
            </div>
        </div>
    )
}