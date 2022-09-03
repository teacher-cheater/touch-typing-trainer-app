import "./StartButton.css";

export function StartButton(start){
    return(
            <div className='btn'>
                <div className="btn__container">
                    <div className="btn__content">
                        <h3 className='btn__title'>Приготовься печатать!</h3>
                        <button className='btn__start' onClick={start}> Start</button>
                    </div>
                </div>
            </div>
    )
}