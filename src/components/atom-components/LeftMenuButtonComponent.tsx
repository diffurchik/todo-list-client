type Props = {
    onClick: () => void,
    hasIcon: boolean,
    title: string
    iconPath?: string,
}

export const LeftMenuButtonComponent: React.FC<Props> = ({onClick, hasIcon, iconPath, title}: Props) => {
    return (
        <button onClick={onClick} style={{backgroundColor: 'transparent', opacity: 0.5}}>
            <div style={{display: "flex", flexDirection: 'row', alignContent: 'center', justifyContent: "center"}}>
                {hasIcon && <img src={iconPath} alt={title} width={20} height={20} style={{marginRight: 4}}/>}
                {title}
            </div>
        </button>
    )
}