import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    color: {
        white: "rgb(247, 247, 247)",
        black: "rgb(17, 18, 29)",
        lightGray: "rgba(127, 127, 127, .3)",
    },
    device: {
        extraSmall: `only screen and (max-width: 600px)`,
        small: `only screen and (min-width: 600px)`,
        medium: `only screen and (min-width: 768px)`,
        large: `only screen and (min-width: 992px)`,
        extraLarge: `only screen and (min-width: 1200px)`,
    }
};