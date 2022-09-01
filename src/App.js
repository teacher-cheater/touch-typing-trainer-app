import {useEffect, useState} from "react";

const URL = 'https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1'


function App() {

    const [text, setText] = useState('')

    useEffect(() => {
        const controller = new AbortController();
        fetch(URL, {
            signal: controller.signal,
        })
            .then((data) => data.json())
            .then((response) => setText(response))
        return () => controller.abort(); //прерывание заапросов
    }, []);

  return (
    <div className="App">
        <div className="main">
            <h1 className="main__title">Тренажёр слепой печати</h1>
            <div className="main__window">
                <div className="main__text">{text}</div>
                    <span className="main__textarea"></span>
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
                            <span > 99 </span>
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
