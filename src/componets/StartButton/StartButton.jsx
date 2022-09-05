import "./StartButton.css";

export function StartButton({activeModal, setActiveModal, timerActive, setTimerActive}){
    return(
            <div className={activeModal ? 'btn' : 'active'}>
                <div className="btn__container">
                    <div className="btn__content">
                        <h3 className='btn__title'>Приготовься печатать!</h3>
                        <button
                            className='btn__start'
                            onClick={()=>
                            setActiveModal(true)
                            // setTimerActive(!timerActive)}
                        }
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
    )
}