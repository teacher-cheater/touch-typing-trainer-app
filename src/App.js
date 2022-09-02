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
        return () => controller.abort(); //прерывание запросов
    }, []);


    useEffect(() => {
        const onKeypress = e => console.log(e);
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
                <span id='myText' className="main__text"></span>
                {/*{text.map((symbol, index) => (*/}
                {/*        <span id='area' className="main__textarea" key={index}>{symbol}</span>*/}
                {/*))}*/}
                <span className="main__passed">{text}</span>
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
