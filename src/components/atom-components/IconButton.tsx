import * as React from "react";

type Props = {
    icon: string,
    width: number,
    height: number,
    onClick: () => void,
    isHovered?: boolean,
    backgroundTrigger?: boolean
}
export const IconButton: React.FC<Props>= ({icon, height, width, onClick, isHovered, backgroundTrigger}:Props) => {
    return (
        <button
            onClick={onClick}
            style={{
                background: backgroundTrigger ? '#eaeded' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
                height: height,
                opacity: isHovered ? 1 : 0,
                marginRight: 4
            }}
        >
            <img src={icon} alt="drop-down menu of task" width="15" height="15"/>
        </button>
    )
}