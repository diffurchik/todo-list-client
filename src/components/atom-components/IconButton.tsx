import * as React from "react";

type Props = {
    icon: string,
    width: number,
    height: number,
    onClick: () => void,
}
export const IconButton: React.FC<Props>= ({icon, height, width, onClick}:Props) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
                height: height,
                marginRight: 4
            }}
        >
            <img src={icon} alt="drop-down menu of task" width={width} height={height}/>
        </button>
    )
}