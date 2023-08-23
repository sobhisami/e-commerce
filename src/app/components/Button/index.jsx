import React from 'react'
import { MyButton, SecondaryMyButton } from './style'
const Button = ({ children, varient, size = "small", iconRight, icon, fullWidth, ...rest }) => {
    if (varient === 'secondary') {
        return (
            <SecondaryMyButton {...rest}
                icon={icon}
                iconRight={iconRight}
                size={size}
                fullWidth={fullWidth}
            >
                {(!iconRight && icon) && <span className='icon'>{icon}</span>}
                {children}
                {(iconRight && icon) && <span className='icon'>{icon}</span>}
            </SecondaryMyButton>
        )
    }

    return (
        <MyButton {...rest}
            icon={icon}
            iconRight={iconRight}
            size={size}
            fullWidth={fullWidth}
        >
            {(!iconRight && icon) && <span className='icon'>{icon}</span>}
            {children}
            {(iconRight && icon) && <span className='icon'>{icon}</span>}
        </MyButton>
    )
}

export default Button