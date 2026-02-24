function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = React.useState(
        window.matchMedia(`(max-width: ${breakpoint}px)`).matches
    );

    React.useEffect(() => {
        const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const listener = () => setIsMobile(media.matches);

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [breakpoint]);

    return isMobile;
}