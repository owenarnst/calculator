import '../styles/Button.css'

export function Equals(props) {
    return (
        <button id="equals" className="btn btn-success shadow-none custom-box" onClick={props.Calculate}>=</button>
    )
}

export function AllClear(props) {
    return (
        <button id="clear" className="btn btn-danger shadow-none custom-box" onClick={props.Clear}>AC</button>
    )
}

export function Decimal(props) {
    return (
        <button id="decimal" className="btn btn-dark shadow-none custom-box" onClick={props.applyDec}>.</button>
    )
}