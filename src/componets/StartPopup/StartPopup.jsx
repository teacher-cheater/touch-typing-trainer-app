import "./StartPopup.css";

export function StartPopup({setPopup, setStartDate, popup}){
    return(
            <div className={popup ? 'active' : 'popup'}>
                <div className="popup__container">
                    <div className="popup__content">
                        <h3 className='popup__title'>Get ready to type!</h3>
                        <button
                            onClick={() => {
                                    setPopup(false);
                                    setStartDate(new Date());
                                }}
                            className='popup__start'
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
    )
}