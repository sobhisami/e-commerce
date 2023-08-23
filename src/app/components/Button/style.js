import styled from "styled-components";

let padding = 7;
export const MyButton = styled.button`
    ${props => props.margin ? 'margin: ' + props.margin + ";" : ""}
    
    outline: none;
    border: none;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    text-transform: capitalize;
    color: ${props => props.theme.colors.white};
    background: ${props => props.background ? props.background : props.theme.colors.blue};
    width: ${props => props.fullWidth ? "100%" : "fit-content"};
    ${props => styleBasedOnSize(props.size, props.theme)}
    ${props => styleBasedOnIcon(props.icon, props.iconRight)}


    .icon{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        ${props => fontBasedOnSize(props.size, props.theme)}
    }
    
    filter: brightness(110%);
    &:hover{
        filter: brightness(95%);
    }
`

export const SecondaryMyButton = styled(MyButton)`
    background-color: ${props => props.theme.colors.white};
    color:${props => props.theme.colors.blue};
    border: 1px solid ${props => props.theme.colors.gray.gray400};
`
const styleBasedOnSize = (size, theme) => {
    switch (size) {
        case "small":
            padding = 7
            return `
                padding: ${padding}px ${padding * 2}px;
                border-radius: 6px;
                ${fontBasedOnSize(size, theme)}
            `
        case "medium":
            padding = 10
            return `
                padding: ${padding}px ${padding * 2}px;
                border-radius: 6px;
                ${fontBasedOnSize(size, theme)}
            `
        case "large":
            padding = 16
            return `
                padding: ${padding}px ${padding * 2}px;
                border-radius: 8px;
                ${fontBasedOnSize(size, theme)}
            `
        default:
            padding = 7
            return `
                border-radius: 6px;
                ${fontBasedOnSize(size, theme)}
            `
    }
}

const fontBasedOnSize = (size, theme) => {
    switch (size) {
        case "small":
            return `
                ${theme.fonts.body2.size}
                ${theme.fonts.body2.height}
            `
        case "medium":
            return `
                ${theme.fonts.body1.size}
                ${theme.fonts.body1.height}
            `
        case "large":
            return `
                ${theme.fonts.h6.size}
                ${theme.fonts.h6.height}
            `
        default:
            return `
                ${theme.fonts.body2.size}
                ${theme.fonts.body2.height}
            `
    }
}

const styleBasedOnIcon = (icon, iconRight) => {
    if (icon && iconRight) {
        return `
            padding: ${padding}px ${padding * 1.5}px ${padding}px  ${padding * 2}px;
            display: grid;
            align-items: center;
            grid-template-columns: 1fr auto;
            grid-gap: 10px;
        `
    } else if (icon) {
        return `
            padding: ${padding}px ${padding * 2}px ${padding}px  ${padding * 1.5}px;
            display: grid;
            align-items: center;
            grid-template-columns: auto 1fr;
            grid-gap: 10px;
        `
    } else {
        return ``
    }
}