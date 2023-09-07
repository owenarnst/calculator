import '../styles/Button.css'

function Operations(props) {
    let id;
    switch(props.symbol) {
        case('-'):
            id="subtract";
            break;
        case('+'):
            id="add";
            break;
        case('/'):
            id="divide";
            break;
        case('x'):
            id="multiply";
            break;
    }
    return(
        <button id={id} className="btn btn-primary shadow-none custom-box" onClick={props.applyOp}>{props.symbol}</button>
    )
}

export default Operations;