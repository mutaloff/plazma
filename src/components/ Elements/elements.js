import './elements.css'
import ContentLoader from "react-content-loader"


const Checkbox = ({ condition, callback, name }) => {
    return <div className="">
        <input type="checkbox" id={name} onChange={(e) => callback(condition)} />
        <label htmlFor={name}>{name}</label>
    </div>
}


const Button = ({ name, width, height, handler, args = [] }) => {
    return <div
        style={
            {
                width,
                height,
                borderRadius: 0.28 * height,
                fontSize: height > 30 ? 0.42 * height : 0.55 * height
            }
        }
        onClick={() => handler(...args)}
        className='basebutton'>
        {name}
    </div>
}


const Loader = (props) => {

    return <ContentLoader
        width={props.width}
        speed={2}
        height={30}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="3" y="5" rx="0" ry="0" height="24" width="200" />
    </ContentLoader>
}

export default Loader




export { Checkbox, Button, Loader }

