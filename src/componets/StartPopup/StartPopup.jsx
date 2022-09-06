import "./StartPopup.css";

export function StartPopup(){
    return(
            <div className='btn'>
                <div className="btn__container">
                    <div className="btn__content">
                        <h3 className='btn__title'>Приготовься печатать!</h3>
                        <button
                            className='btn__start'
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
    )
}