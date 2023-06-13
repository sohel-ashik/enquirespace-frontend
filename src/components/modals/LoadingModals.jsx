
export default function LoadingModal({open, children, }){
    return(
        <div 
            className={`fixed inset-0 flex justify-center items-center backdrop-blur-sm transition-opacity duration-700  ${open ? "visible opacity-100 bg-black/60": "invisible opacity-0"}`}>
                {children}
        </div>
    )

}