import "./StartButton.css";

export function StartButton({activeModal, setActiveModal}){
    return(
            <div className={activeModal ? 'btn' : 'active'}>
                <div className="btn__container">
                    <div className="btn__content">
                        <h3 className='btn__title'>Приготовься печатать!</h3>
                        <button className='btn__start' onClick={()=> setActiveModal(true)}> Start </button>
                    </div>
                </div>
            </div>
    )
}