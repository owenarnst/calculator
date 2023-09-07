import '../styles/Button.css'

function Numbers(props) {
    return (
      <button id={props.num} className="btn btn-dark shadow-none custom-box" onClick={props.applyNum}>{props.val}</button>
    );
}

export default Numbers;