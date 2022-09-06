
import {useEffect, useState} from "react";
import {StartPopup} from "./componets/StartPopup/StartPopup";

const URL = 'https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1'

function Letter(props) {
    const {letter, active, correct, incorrect} = props;
    if (correct === true) {
        return <span className='correct-word'>{letter}</span>
    }
    // if(incorrect === true){
    //     return <span className='incorrect-word'>{letter}</span>
    // }
    if (active) {
        return <span className={active ? 'active' : 'incorrect-word'}>{letter}</span>
    }
    return <span>{letter}</span>
}


    // function Accurary(props){
    //     const [accuracyScore, setAccuracyScore] = useState(0);
    //     const{wrongCount, rightCount} = props;
    //
    //     useEffect(() => {
    //         setAccuracyScore((score) => Number(rightCount - wrongCount) /  score);
    //         console.log(accuracyScore);
    //     }, []);
    //
    //     return <div className="main__result">
    //         <span> {accuracyScore} </span>
    //         %
    //     </div>
    // }


function App() {
    const [text, setText] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [startCounting, setStartCounting] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [rightCount, setRightCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [lastLetterIncorrect, setLastLetterIncorrect] = useState(false);
    const speed = 10;
    const accuracy = 100;
    console.log(rightCount);
    console.log(wrongCount)
    //кнопка старт и пошел отсчет
    //отследить последний индекс и вывести результат
    //начальное время хранить (старт) хранить правильных/неправильных символов
    //хранить индекс следующего символа
    ///скорость и точность вычисляемые (создать переменную и положите результат)

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
                <StartPopup
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    // timerActive={timerActive}
                    // setTimerActive={setTimerActive}
                />
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
                    {/*<span className="main__passed"></span>*/}
                    <div className="main__content">
                        <div className="speed"> speed:
                            <div className="main__result">
                                <span> {speed} </span>
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
