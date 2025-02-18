import { useCallback } from "react"
import { IconButton } from "../atom-components/IconButton"
import WeekDaysPicker from "../atom-components/WeekDaysPicker"
import styles from "../styles/button-apply.module.css"
import { ButtonComponent } from "../atom-components/ButtonComponent.tsx"
import { Task } from "../../Task.ts"
type RepeatMenuComponentProps = {
    onClose: () => void,
    task: Task
}

export const RepeatMenuComponent: React.FC<RepeatMenuComponentProps> = ({ onClose, task }: RepeatMenuComponentProps) => {

    const handleApplyButtonClick = useCallback(() => {
        task.setTaskRepeated(true)
        onClose()
    }, [onClose, task])

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

            <WeekDaysPicker />
            <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10, marginTop: 15}}>
                <ButtonComponent onClick={() => { }} hasIcon={true} iconPath={"/weekend.svg"} title="Repeat every weekend" size="small" />
                <ButtonComponent onClick={() => { }} hasIcon={true} iconPath={"/weekend.svg"} title="Repeat every work day" size="small" />
            </div>
            <button className={styles.button_apply} onClick={handleApplyButtonClick}>Apply settings</button>
        </div>
    )
}