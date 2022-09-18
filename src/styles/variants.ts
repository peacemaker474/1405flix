export const nowVariants = {
    hidden: (isBack: boolean) => ({
        x: isBack ? -window.outerWidth : window.outerWidth,
    }),
    visible: {
        x: 0,
    },
    exit: (isBack: boolean) => ({
        x: isBack ? window.outerWidth : -window.outerWidth,
    })
};

export const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        height: 300,
        scale: 1.4,
        y: -75,
        boxShadow: "rgba(247, 247, 247, 0.1) 0px 1px 4px, rgb(247, 247, 247) 0px 0px 0px 0px",
        transition: {
            delay: 0.7,
            duration: 0.3,
            type: "tween",
        }
    }
};

export const imgVariants = {
    normal: {
        height: 200,
    },
    hover: {
        height: 200,
        borderRadius: "5px 5px 0 0",
        transition: {
            delay: 0.7,
            duration: 0.3,
        }
    }
};

export const infoVariants = {
    hover: {
        display: "flex",
        borderRadius: "0 0 5px 5px",
        transition: {
            delay: 0.7,
            duration: 0.3,
        }
    }
};