import { Button } from "./styles/button-component.style"

type Props = {
    onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void),
    title: string,
    hasIcon?: boolean,
    iconPath?: string,
    size?: 'small' | 'medium' | 'large',
    variant?: 'empty' | 'danger-filled' | 'filled'
}

export const ButtonComponent: React.FC<Props> = ({onClick, hasIcon = false, iconPath, title, size = "medium", variant = 'empty'}: Props) => {
    return (
        <Button onClick={onClick} variant={variant} size={size}>
            <div style={{display: "flex", flexDirection: 'row', alignContent: 'center', justifyContent: "center"}}>
                {hasIcon &&
                    <img src={iconPath} alt={title} width={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
                        height={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
                        style={{ marginRight: 4 }}
                    />
                }
                {title}
            </div>
        </Button>
    )
}