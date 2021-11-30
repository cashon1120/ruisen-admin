import {Spin} from 'antd'

const Loading = () => {
    return <div style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Spin spinning /></div>
}

export default Loading