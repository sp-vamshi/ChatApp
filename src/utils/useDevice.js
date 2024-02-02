import { useState, useEffect } from "react";

function detectDeviceType() {
    let deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    return {
        Mobile: deviceType === "Mobile",
        Desktop: deviceType === "Desktop"
    }
}

const useDevice = () => {
    const [device, setDevice] = useState(detectDeviceType())

    function windowResizeHandler(e) {
        if (e.srcElement?.innerWidth <= 900) {
            setDevice({
                Mobile: true,
                Desktop: false
            })
        } else {
            setDevice({
                Mobile: false,
                Desktop: true
            })
        }
    }

    useEffect(() => {
        window.addEventListener("resize", windowResizeHandler)

        return () => window.removeEventListener("resize", windowResizeHandler)
    }, [])


    return [device]
}

export default useDevice