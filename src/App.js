

// const URL = 'https://baconipsum.com/json-api/';
// const URL = 'https://baconipsum.com/api/?type=meat-and-filler'


function App() {


  return (
    <div className="App">
        <div className="main">
            <h1 className="main__title">Тренажёр слепой печати</h1>
            <div className="main__window">
                <div className="main__text">{text}</div>
                <div className="main__content">
                    <div className="speed"> speed:  </div>
                    <div className="speed"> accuracy:  </div>

                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
