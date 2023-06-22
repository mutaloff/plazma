
const SearchList = ({ display, list, keyHandler, num, setText, setPlaceHolder, handler, setItems }) => {

    const clickHandler = (e, el) => {
        setPlaceHolder('')
        setText(el)
        e.target.value = el
        handler(e)
        setItems([])
    }

    return <div className="list" onKeyDown={keyHandler} >
        {
            list.map((el, i) => (
                <div
                    key={i}
                    style={{ display: display ? 'block' : 'none', background: num === i && '#5264AE' }}
                    className='list-item'
                    onClick={(e) => clickHandler(e, el)}>
                    {el}
                </div>
            ))
        }
    </div>
}

export default SearchList