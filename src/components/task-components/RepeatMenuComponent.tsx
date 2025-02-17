import { useCallback } from "react"
import { IconButton } from "../atom-components/IconButton"
import WeekDaysPicker from "../atom-components/WeekDaysPicker"
import styles from "../styles/button-apply.module.css"

type RepeatMenuComponentProps = {
    onClose: () => void
}

export const RepeatMenuComponent: React.FC<RepeatMenuComponentProps> = ({ onClose }: RepeatMenuComponentProps) => {

    const handleApplyButtonClick = useCallback(() => {
        console.log("Apply button clicked")
        onClose()
    }, [onClose])

    return (
        <div id = 'repeat-menu' style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            zIndex: 11,
            width: 'auto',
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            top: '50%',
            left: '100%',
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 10 }}>
                <div style={{ position: 'absolute', left: 10, top: 10 }}>
                    <IconButton icon={"/arrow-left.svg"} width={20} height={20} onClick={() =>{ onClose() }}/>
                </div>
                <div style={{padding: 10, fontSize: 14, fontWeight: 600, flex: 1}}>Repeat settings</div>
            </div>

            <WeekDaysPicker/>
            <button className={styles.button_apply} onClick={handleApplyButtonClick}>Apply settings</button>
        </div>
    )
}