type Props = {
    onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void),
    hasIcon: boolean,
    title: string,
    iconPath?: string,
    size: 'small' | 'medium' | 'large'
}

export const ButtonComponent: React.FC<Props> = ({onClick, hasIcon, iconPath, title, size}: Props) => {
    return (
        <button onClick={onClick} style={{
            backgroundColor: 'transparent', opacity: 0.5,
            width: size === 'small' ? '200px' : size === 'medium' ? 'auto' : '100%',
            padding: size === 'small' ? 4 : size === 'medium' ? 8 : 12,
            // borderRadius: size === 'small' ? 4 : size === 'medium' ? 8 : 12,
            // border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{display: "flex", flexDirection: 'row', alignContent: 'center', justifyContent: "center"}}>
                {hasIcon &&
                    <img src={iconPath} alt={title} width={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
                        height={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
                        style={{ marginRight: 4 }}
                    />
                }
                {title}
            </div>
        </button>
    )
}