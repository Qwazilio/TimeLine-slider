import classes from "./Arrow.module.scss"

interface ArrowProps {
    direction?: "left" | "right";
}
export default function Arrow({direction}: ArrowProps) {

    return(
        <div className={classes.arrow}>
            <div className={classes['arrow-top']}></div>
            <div className={classes['arrow-bottom']}></div>
        </div>
    )
}