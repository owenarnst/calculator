function Display(props) {
    return (
        <h3 id="window" className="d-grid lh-lg mb-0 px-2 text-end">
                <span id="equation" className="custom-span">{props.equation}</span>
                <span id="display" className="custom-span">{props.answer}</span>
        </h3>
    )
}

export default Display;