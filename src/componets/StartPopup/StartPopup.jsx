import "./StartPopup.css";

export function StartPopup({setPopup, setStartDate, popup}){
    return(
            <div className={popup ? 'active' : 'btn'}>
                <div className="btn__container">
                    <div className="btn__content">
                        <h3 className='btn__title'>Приготовься печатать!</h3>
                        <button
                            onClick={() => {
                                    setPopup(false);
                                    setStartDate(new Date());
                                }}
                            className='btn__start'
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
    )
}