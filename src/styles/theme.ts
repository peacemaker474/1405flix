import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    red: "#E51013",
    black: {
        veryDark: "#141414",
        darker: "#181818",
        lighter: "#2F2F2F",
    },
    white: {
        lighter: "#fff",
        darker: "#e5e5e5",
    },
    device: {
        extraSmall: `only screen and (max-width: 600px)`,
        small: `only screen and (min-width: 600px)`,
        medium: `only screen and (min-width: 768px)`,
        large: `only screen and (min-width: 992px)`,
        extraLarge: `only screen and (min-width: 1200px)`,
    }
};