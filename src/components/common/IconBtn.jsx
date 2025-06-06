import React from 'react'

const IconBtn = ({
    text, 
    onClick, 
    children, 
    disabled,
    outline=false, 
    customClasses, 
    type}) => {

  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={customClasses}
    >
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (
                <span>
                    {text}
                </span>
            )
        }
    </button>
  )
}

export default IconBtn
