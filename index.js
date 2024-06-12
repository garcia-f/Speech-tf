async function createModel() {

    const recognizer = await speechCommands.create('BROWSER_FFT');

    await recognizer.ensureModelLoaded();
    return recognizer;
}

async function init() {
    const recognizer = await createModel();

    const classLabels = recognizer.wordLabels();
    console.log(classLabels)
    const startButton = document.getElementById('start-button');
    const resultDiv = document.getElementById('result');

    function listen() {
        recognizer.listen(result => {
            const {scores} = result;
            const scoresArray = Array.from(scores).map((s, i) => ({score: s, word: classLabels[i]}));
            scoresArray.sort((a, b) => b.score - a.score);
            resultDiv.innerHTML = `Command: ${scoresArray[0].word} (${(scoresArray[0].score * 100).toFixed(2)}%)`;
        }, {
            probabilityThreshold: 0.75
        });

        startButton.innerText = 'Stop Listening';
        startButton.onclick = () => {
            recognizer.stopListening();
            startButton.innerText = 'Start Listening';
            startButton.onclick = listen;
        };
    }

    startButton.onclick = listen;
}

init();



// 2:"down"
// 3:"eight"
// 4:"five"
// 5:"four"
// 6:"go"
// 7:"left"
// 8:"nine"
// 9:"no"
// 10:"one"
// 11:"right"
// 12:"seven"
// 13:"six"
// 14:"stop"
// 15:"three"
// 16:"two"
// 17:"up"
// 18:"yes"
// 19:"zero"