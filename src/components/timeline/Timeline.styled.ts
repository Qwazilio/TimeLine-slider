import styled from "styled-components";
import {colors} from "@/theme/colors";

export const Wrapper = styled.div`
    padding: 0 5%;
    position: relative;

    font-family: "PT Sans", serif;
    line-height: 1.2;

    overflow: hidden;
    margin: 1em 0;

    color: ${colors.textPrimary};
    font-weight: bold;
    background: transparent;

    @media (max-width: 768px) {
        padding: 0 2.5%;
    }
`;

export const Container = styled.div`
    position: relative;

    border: 1px solid rgba(66, 86, 122, 0.2);
    padding: 5% 0;
    width: 100%;

    overflow: hidden;

    @media (max-width: 768px) {
        border: none;
        padding: 0;
        position: static;
    }
`;

export const TopSection = styled.div`
    position: relative;

    display: flex;
    justify-content: center;

    margin-bottom: 5%;

    @media (max-width: 768px) {
        justify-content: space-between;
        width: 100%;
        margin: 0;
    }
`;

export const TimelineHeader = styled.div`
    position: absolute;
    left: 0;

    padding-left: 5%;
    font-size: 56px;

    @media (max-width: 1200px) {
        position: inherit;
        font-size: 40px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        padding: 0;
    }
`;

export const GradientLine = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    width: 5px;
    height: 100%;

    background: linear-gradient(
            ${colors.accentPrimary},
            ${colors.accentSecondary}
    );

    @media (max-width: 768px) {
        display: none;
    }
`;

export const BottomLeftControls = styled.div`
    position: absolute;
    left: 5%;
    bottom: 0;

    z-index: 10;

    @media (max-width: 768px) {
        position: static;
    }
`;

export const MobileControlsWrapper = styled.div`
    position: relative;
    margin: 10% 0;
`;

export const Counter = styled.div`
    margin: 10px;
    letter-spacing: 0.05em;
`;

export const Arrows = styled.div`
    display: flex;
    gap: 8px;
`;

export const SliderDots = styled.div`
    display: flex;
    width: 50% !important;
    justify-content: center;

    position: absolute;
    top: 50% !important;
    left: 50% !important;

    transform: translate(-50%, -50%) !important;
`;