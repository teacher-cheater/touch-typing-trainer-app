import "./GameOver.css";

export function GameOver({setPopup, setStartDate, speed, accuracy}){
    return(
        <div className='active'>
            <div className="btn__container">
                <div className="btn__content">
                    <h3 className='btn__title'>
                        Ваш результат
                        <p className='btn__result'>speed: {Math.floor(speed)}</p>
                        <p className='btn__result'> accuracy: {accuracy}</p>
                    </h3>
                    <button
                        onClick={() => {
                            setPopup('btn');
                            setStartDate(new Date());
                        }}
                        className='btn__start'
                    >
                        Начать заново
                    </button>
                </div>
            </div>
        </div>
    )
}