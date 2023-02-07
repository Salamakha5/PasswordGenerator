import { useState } from "react"

function OnePassword(props){
    let a = props.data.split(" ")
    const [text,setText] = useState(a[1])
    function copyText(){
        navigator.clipboard.writeText(a[1])
        setText("Copied!")
        let g = setInterval(()=>{
            console.log("Interval");
            setText(a[1])
            clearInterval(g)
        },1000)
    }
    return(
        <div onClick={copyText} className="m-1 mt-2 d-flex">
            <strong>{a[0]+"."}</strong>
            <span>{text}</span>
        </div>
    )
}
export default OnePassword