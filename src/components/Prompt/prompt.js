import { useSelector } from 'react-redux'
import './prompt.css'


function Prompt() {

    const { showPrompt, promptNote } = useSelector(state => state.ui)

    return <div
        className='base-prompt' style={{ display: showPrompt ? 'flex' : 'none' }}>
        {promptNote}
    </div>
}


export default Prompt