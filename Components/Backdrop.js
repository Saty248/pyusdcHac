const Backdrop = (props) => {
    return <div style={{backgroundColor: "rgba(185, 186, 185, 0.5)"}} className="h-screen w-screen fixed left-0 top-0 bg-slate-400 z-10" onClick={props.onClick}>

    </div>
}

export default Backdrop;