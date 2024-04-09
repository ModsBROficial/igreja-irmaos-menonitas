export default function checkKey (ev, execFunction) {
    if(ev.key === "Enter" || ev.keyCode === 13){
        execFunction()
    }
}