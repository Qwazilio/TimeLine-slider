import styled from "styled-components";
import {colors} from "@/theme/colors";
import React from "react";
import {TimelineCircleNode} from "@/components/timeline/TimelineCircle";
import {useCounterAnimation} from "@/hook/useCounterAnimated";

interface TimeLineCircleMobileProps {
    startYear: number;
    endYear: number;
    title?: string;
}
export default function TimeLineCircleMobile({
        startYear,
        endYear,
        title,
    }: TimeLineCircleMobileProps) {

    return (
        <Wrapper>
            <MobileYearRow style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{color: colors.accentPrimary}}>{startYear || "XXXX"}</div>
                <div style={{color: colors.accentSecondary}}>{endYear || "XXXX"}</div>
            </MobileYearRow>
            {title && (<ActiveNodeTitle>{title}</ActiveNodeTitle>)}
            <Divider />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
`

const ActiveNodeTitle = styled.div`
    white-space: nowrap;
    width: 100%;
`;


const MobileYearRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    font-size: 90px;
    font-weight: bold;
    padding: 15% 20px;
    
    @media (max-width: 512px) {
        font-size: 56px;
    }
`;

const Divider = styled.div`
    border-top: 2px solid rgba(66, 86, 122, 0.2);
    margin: 20px 0;
`;