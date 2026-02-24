import {colors} from "@/theme/colors";
import React from "react";
import styled from "styled-components";

interface TimelineDateProps {
    startYear: number | string;
    endYear: number | string;
}
export default function TimelineDate({startYear, endYear}: TimelineDateProps) {
    return (
        <>
            {/* Левая дата */}
            <Year style={{color: colors.accentPrimary}} side={"left"}>
                {startYear || "XXXX"}
            </Year>
            {/* Правая дата */}
            <Year style={{color: colors.accentSecondary}} side={"right"}>
                {endYear || "XXXX"}
            </Year>
        </>
    )
}

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