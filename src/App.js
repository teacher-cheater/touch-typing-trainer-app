import {useEffect, useState} from "react";
import {StartPopup} from "./componets/StartPopup/StartPopup";
import {GameOver} from "./componets/GameOver/GameOver";
import {MainWindow} from "./componets/MainWindow/MainWindow";

const URL = 'https://baconipsum.com/api/?type=all-meat&sentences=5&start-with-lorem=1';

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
    const speed = startDate ? rightCount / (timeSpent / 60000) : null;
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
                <h1 className="main__title">Touch typing trainer</h1>
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
                <MainWindow
                    text={text}
                    speed={speed}
                    activeIndex={activeIndex}
                    lastLetterIncorrect={lastLetterIncorrect}
                    accuracy={accuracy}
                />
            </div>
        </div>
    )
}

export default App;
