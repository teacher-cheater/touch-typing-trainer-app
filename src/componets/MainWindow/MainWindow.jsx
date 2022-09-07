function Letter({letter, active, correct, incorrect}) {

    if (correct) {
        return <span className='correct-word'>{letter}</span>
    }

    if (incorrect) {
        return <span className='incorrect-word'>{letter}</span>
    }

    if (active) {
        return <span className={active ? 'active' : 'incorrect-word'}>{letter}</span>
    }

    return <span>{letter}</span>
}

export function MainWindow({text, speed, activeIndex, lastLetterIncorrect, accuracy}) {
    return (
        <div className="main__window">
                    <span className="main__text">
                        {text.map((letter, index) => {
                            return <Letter letter={letter}
                                           key={index}
                                           active={index === activeIndex}
                                           correct={index < activeIndex}
                                           incorrect={index === activeIndex && lastLetterIncorrect}
                            />
                        })}
                    </span>
            <div className="main__content">
                <div className="speed"> speed:
                    <div className="main__result">
                        <span> {Math.floor(speed)} </span>
                        WPM
                    </div>
                </div>
                <div className="accuracy"> accuracy:
                    <div className="main__result">
                        <span> {accuracy} </span>
                        %
                    </div>
                </div>
            </div>
        </div>
    )
}