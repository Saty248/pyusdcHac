import { useEffect, useState } from "react"

export const useMobile = () => {
    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
        if (windowWidth) return;
        if (!global || !global.window) return;
        setWindowWidth(global.window.innerWidth);
    }, [global])

    const isMobile = windowWidth < 768;

    const handleResize = () => setWindowWidth(window.innerWidth);

    useEffect(() => {
        if (!window) return;
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile };
}

