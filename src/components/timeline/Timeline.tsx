import styled from "styled-components";
import TimelineSlider from "@/components/timeline/TimelineSlider";
import CircleArrow from "@/components/UI/CircleArrow";
import TimelineCircle, {TimelineCircleNode} from "@/components/timeline/TimelineCircle";
import {useState} from "react";

const timelineCircleNodes: TimelineCircleNode[] = [
    {
        title: "Кино: переход к звуковому кино",
        yearStart: 1927,
        yearEnd: 1932,
    },
    {
        title: "Наука: развитие квантовой механики",
        yearStart: 1925,
        yearEnd: 1930,
    },
    {
        title: "Война: Вторая мировая война",
        yearStart: 1939,
        yearEnd: 1945,
    },
    {
        title: "Космос: начало космической эры",
        yearStart: 1957,
        yearEnd: 1961,
    },
    {
        title: "Технологии: становление интернета",
        yearStart: 1991,
        yearEnd: 1996,
    },
    {
        title: "Медицина: расшифровка генома человека",
        yearStart: 1990,
        yearEnd: 2003,
    },
]

interface TimelineProps {
    nodes: TimelineCircleNode[];
}
export default function Timeline() {
    const [activeTimeline, setActiveTimeline] = useState(0);

    const nextActiveTimeline = () => {
        if (activeTimeline >= 5) {
            setActiveTimeline(0);
        } else setActiveTimeline(activeTimeline + 1);
    }

    const prevActiveTimeline = () => {
        if (activeTimeline <= 0) {
            setActiveTimeline(5);
        } else setActiveTimeline(activeTimeline - 1);
    }

    return (
        <div style={{
            paddingLeft: "5em 0em",
            position: "relative",
            padding: "0% 10%",
            fontFamily: 'PT Sans',
            overflow: "hidden",
            marginTop: "1em",
            marginBottom: "1em",
        }}>
            <div style={{
                position: "relative",
                border: "1px solid rgba(66, 86, 122, 0.2)",
                padding: "5% 0%",
                overflow: "hidden"
            }}>

                <div style={{position: 'relative', display: "flex", justifyContent: "center"}}>
                    <div style={{position: 'absolute', left: 0, paddingLeft: "5%"}}>
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '5px',           // толщина линии
                            height: '100%',         // высота линии
                            background: 'linear-gradient(#3877EE, #EF5DA8)'
                        }}>
                        </div>
                        <h1 style={{fontSize: 56, fontWeight: "bold"}}>Исторические <br/>даты</h1>
                    </div>
                    <TimelineCircle
                        activeTimeline={activeTimeline}
                        setActiveTimeline={setActiveTimeline}
                        nodes={timelineCircleNodes}
                    />
                    <div style={{position: 'absolute', left: 0, bottom: 0, paddingLeft: "5%"}}>
                        <div style={{margin: "10px"}}>0{activeTimeline + 1}/06</div>
                        <div style={{display: "flex"}}>
                            <CircleArrow onClick={prevActiveTimeline} direction={"left"}/>
                            <CircleArrow onClick={nextActiveTimeline} direction={"right"}/>
                        </div>

                    </div>
                </div>
                <TimelineSlider/>
            </div>
        </div>
    )
}