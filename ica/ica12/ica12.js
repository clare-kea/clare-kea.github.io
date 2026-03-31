let newBTN = document.querySelector('#js-new-quote');
newBTN.addEventListener('click', getQuote); 

let answerBTN = document.querySelector('#js-tweet').addEventListener('click', showAnswer);

const answerText = document.querySelector('#js-answer-text');

let current = {
    question: "", 
    answer: ""
}

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'; 

async function getQuote(){
    // alert("THIS WORKS!");
    try {
        const response = await fetch(endpoint);
        if (!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        displayQuote(json['question']);
        current.question = json["question"];
        current.answer = json["answer"];
        console.log(current.answer);
    } catch (err){
        console.log(err)
        alert('Failed to catch new quote');
    }
}

function displayQuote(quote){
    const quoteText = document.querySelector
    ('#js-quote-text');
    quoteText.textContent = quote;
    answerText.textContent = "";
}

function showAnswer(){
    answerText.textContent = current.answer;
}

getQuote();

