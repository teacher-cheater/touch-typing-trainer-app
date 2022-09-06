
import {useEffect, useState} from "react";
import {StartPopup} from "./componets/StartPopup/StartPopup";
import {GameOver} from "./componets/GameOver/GameOver";

const URL = 'https://baconipsum.com/api/?type=all-meat&sentences=0.1&start-with-lorem=1';

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

function App() {
    const [text, setText] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [popup, setPopup] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [lastLetterIncorrect, setLastLetterIncorrect] = useState(false);

    const inputCount = rightCount + wrongCount;
    const timeSpent = (endDate ?? Date.now()) - startDate;
    const speed = startDate ?  rightCount / (timeSpent / 60000) : null;
    const accuracy = Math.floor((rightCount / inputCount) * 100);

    useEffect(() => {
        const controller = new AbortController();
        fetch(URL, {
            signal: controller.signal,
        })
            .then((data) => data.json())
            .then((response) => setText(response.join().split('')))
        return () => controller.abort(); //прерывание запросов
    }, []);

    useEffect(() => {
        const onKeypress = (e) => {

            if (e.key === text[activeIndex]) {
                setLastLetterIncorrect(false);
                setActiveIndex((index) => index + 1);
                setRightCount((count) => count + 1);

                if (activeIndex === text.length - 1) {
                    setGameOver(true);
                    setEndDate(new Date());
                }
            } else {
                setLastLetterIncorrect(true);
                setWrongCount((count) => count + 1);
            }
        };

        document.addEventListener("keypress", onKeypress);
        return () => document.removeEventListener("keypress", onKeypress);
    }, [text, activeIndex]);


    return (
        <div className="App">
            <div className="main">
                <h1 className="main__title">Тренажёр слепой печати</h1>
                {popup &&
                    <StartPopup
                        popup={popup}
                        setPopup={setPopup}
                        setStartDate={setStartDate}
                    />
                }
                {gameOver &&
                    <GameOver
                        speed={speed}
                        accuracy={accuracy}
                    />
                }
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
                        <span className="main__textarea">
                        </span>
                    </span>
                    <div className="main__content">
                        <div className="speed"> speed:
                            <div className="main__result">
                                <span> {Math.floor(speed)} </span>
                                зн/мин
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
            </div>
        </div>
    )
}

export default App;
