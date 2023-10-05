const Backdrop = (props) => {
    return <div style={{backgroundColor: "rgba(37, 37, 48, 0.45)"}} 
                    className="h-screen w-screen fixed left-0 top-0 bg-slate-400 z-20" 
                    onClick={props.onClick}
                    >
                        
            </div>
}

export default Backdrop;