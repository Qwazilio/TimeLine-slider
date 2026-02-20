import styled from "styled-components";
import TimelineSlider from "@/components/timeline/TimelineSlider";
import CircleArrow from "@/components/UI/CircleArrow";
import TimelineCircle from "@/components/timeline/TimelineCircle";

export default function Timeline() {

    return (
        <div style={{
            paddingLeft: "5em 0em",
            position: "relative",
            padding: "0% 10%",
            fontFamily: 'PT Sans',
            overflow: "hidden",
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
                    <TimelineCircle />
                    <div style={{position: 'absolute', left: 0, bottom: 0}}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <CircleArrow direction={"left"}/>
                            <CircleArrow direction={"right"}/>
                        </div>

                    </div>
                </div>
                <TimelineSlider/>
            </div>
        </div>
    )
}