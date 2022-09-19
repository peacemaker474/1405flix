import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            white: string;
            black: string;
            lightGray: string;
        }
        device: {
            extraSmall: string;
            small: string;
            medium: string;
            large: string;
            extraLarge: string;
        }
    }
}