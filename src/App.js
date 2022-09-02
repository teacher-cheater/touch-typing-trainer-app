import {useEffect, useState} from "react";

const URL = 'https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1'


function App() {

    const [text, setText] = useState([])
    // console.log(text.join().split(''))

    // const [rigthCount, setRigthCount] = useState();



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

        }

        document.addEventListener('keypress', onKeypress);
        return () => {
            document.removeEventListener('keypress', onKeypress);
        };
    }, []);





    return (
        <div className="App">
            <div className="main">
                <h1 className="main__title">Тренажёр слепой печати</h1>
                <div className="main__window">
                    <span className="main__text">
                        {text.map(letter =>
                                <span className="main__textarea">
                            {letter}
                        {/* если текущий индекс меньше, чем состояние, то красить зеленым, и красить след индекс*/}
                        </span>
                        )}
                    </span>
                    <span className="main__passed"></span>
                    <div className="main__content">
                        <div className="speed"> speed:
                            <div className="main__result">
                                <span> 7 </span>
                                "зн/мин"
                            </div>
                        </div>
                        <div className="accuracy"> accuracy:
                            <div className="main__result">
                                <span> 99 </span>
                                "%"
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
