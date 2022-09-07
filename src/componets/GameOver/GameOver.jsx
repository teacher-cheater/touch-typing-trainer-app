import "./GameOver.css";

export function GameOver({speed, accuracy}){
    return(
        <div className='result active'>
            <div className="result__container">
                <div className="result__content">
                    <h3 className='result__title'>
                        your result
                        <p className='result__text'> Speed: <span>{Math.floor(speed)} WPM</span> </p>
                        <p className='result__text'> Accuracy: <span>{accuracy} %</span></p>
                    </h3>
                </div>
            </div>
        </div>
    )
}