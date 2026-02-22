import { useEffect, useState } from "react";

export function useCounterAnimation(
    value: number,
    duration = 1000
) {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        let start = displayValue;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            const next = Math.floor(
                start + (value - start) * progress
            );

            setDisplayValue(next);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

    }, [value]);

    return displayValue;
}