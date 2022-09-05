import {StartButton} from "./componets/StartButton/StartButton";

import {useEffect, useState} from "react";

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

    function Timer(props) {
        //длину массива разделить на время и умножить на 60 => получим " " знаков в минуту
        const [speed, setSpeed] = useState(0);
        const{rightCount} = props;
        const minutes = speed/60;
        // const {startCounting, text} = props;
        useEffect(() => {
            const intervalId = setInterval(onTime, 1000);
                function onTime() {
                    setSpeed((time) => time + 1);
                    console.log(speed);
                }
            return () => clearInterval(intervalId);
        }, []);

            // useEffect(() => {
            //     if (speed > 0) {
            //         setInterval(() => {
            //             setSpeed(time => time + 1)
            //         }, 1000);
            //     }
            //
            // }, [])
            return <div className="main__result">
                <span> {Math.floor(rightCount / minutes)} </span>
                зн/мин
            </div>
    }

    function Accurary(props){
        const [accuracyScore, setAccuracyScore] = useState(0);
        const{wrongCount} = props;

        useEffect(() => {
            setAccuracyScore((score) => score + 1);
            console.log(accuracyScore);
        }, []);

        return <div className="main__result">
            <span> {wrongCount} </span>
            %
        </div>
    }

function App() {
    const [text, setText] = useState([])
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [startCounting, setStartCounting] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [rightCount, setRightCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
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
        const onKeypress = e => {
            console.log(e.key)
            //если ввод верен - переходим к след индекс
            if (e.key === text[activeWordIndex]) {
                setActiveWordIndex(ind => ind + 1)
            }
            //если ввод верен - ведем счет
            if(e.key === text[rightCount]) {
                setRightCount(index=> index +1)
            }
            //если ввод неверен - ведем счет
            if(e.key === text[wrongCount]) {
                setWrongCount(index => index +1)
            }
            //зн/мин
            if(!startCounting){
                setStartCounting(false)
            }
        }
        document.addEventListener('keypress', onKeypress);
        return () => {
            document.removeEventListener('keypress', onKeypress);
        };
    }, [text, activeWordIndex]);


    return (
        <div className="App">
            <div className="main">
                <h1 className="main__title">Тренажёр слепой печати</h1>
                <StartButton
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
                                           active={index === activeWordIndex}
                                           correct={index < activeWordIndex}
                                           incorrect={index !== activeWordIndex}
                            />
                        })}
                        <span className="main__textarea">
                        </span>
                    </span>
                    {/*<span className="main__passed"></span>*/}
                    <div className="main__content">
                        <div className="speed"> speed:
                            <Timer
                                text={text.length}
                                rightCount={rightCount}
                                // startCounting={startCounting}
                                // text={activeWordIndex}
                            />
                            {/*<div className="main__result">*/}
                            {/*    <span> 7 </span>*/}
                            {/*    зн/мин*/}
                            {/*</div>*/}
                        </div>
                        <div className="accuracy"> accuracy:
                            <Accurary
                                wrongCount={wrongCount}
                            />
                            {/*<div className="main__result">*/}
                            {/*    <span> 99 </span>*/}
                            {/*    %*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
