import {StartButton} from "./componets/StartButton/StartButton";

import {useEffect, useState} from "react";

const URL = 'https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1'



function Letter(props){
    const {letter, active, correct} = props;
    if(correct === true){
        return <span className='correct-word'>{letter}</span>
    }
    // if(correct === false){
    //     return <span className='incorrect-word'>{letter}</span>
    // }
    if(active){
        return <span className='active'>{letter}</span>
    }
    return <span>{letter}</span>
}





function App() {

    const [text, setText] = useState([])

    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [activeModal, setActiveModal] = useState(false);

    const [rightCount, setRightCount] = useState(0);



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
            if(e.key === text[activeWordIndex]){
                setActiveWordIndex(ind => ind +1)
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
                <StartButton activeModal={activeModal} setActiveModal={setActiveModal}/>
                <div className="main__window">

    {/*                <span className="main__text">*/}
    {/*                    {text.map((letter, index) =>*/}
    {/*                        <span className="main__textarea">{letter}</span>*/}
    {/*                    )}*/}

    {/*                    <span className="main__textarea">*/}
    {/*/!* если текущий индекс меньше, чем состояние, то красить зеленым, и красить след индекс*!/*/}
    {/*                    </span>*/}
    {/*                </span>*/}
                    <span className="main__text">
                        {text.map((letter, index) => {
                            return <Letter letter={letter}
                                            active={index === activeWordIndex}
                                            correct={index < activeWordIndex}
                            />
                        })}
                        <span className="main__textarea">
    {/* если текущий индекс меньше, чем состояние, то красить зеленым, и красить след индекс*/}
                        </span>
                    </span>
                    {/*<span className="main__passed"></span>*/}
                    <div className="main__content">
                        <div className="speed"> speed:
                            <div className="main__result">
                                <span> 7 </span>
                                зн/мин
                            </div>
                        </div>
                        <div className="accuracy"> accuracy:
                            <div className="main__result">
                                <span> 99 </span>
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
