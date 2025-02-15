import {LeftMenuButtonComponent} from "./atom-components/LeftMenuButtonComponent.tsx";

export const DayFilterComponent: React.FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <LeftMenuButtonComponent title={'Today'} onClick={()=>{}} hasIcon={true} iconPath={'/today.svg'}/>
            <LeftMenuButtonComponent title={'Tomorrow'} onClick={()=>{}} hasIcon={true} iconPath={'/tomorrow.svg'}/>
            <LeftMenuButtonComponent title={'Weekend'} onClick={()=>{}} hasIcon={true} iconPath={'/weekend.svg'}/>
            <div style={{marginTop:60}}>
                <LeftMenuButtonComponent title={'Incoming'} onClick={()=>{}} hasIcon={true} iconPath={'/incoming.svg'}/>
            </div>
        </div>
    )
}