// query selectors. + variables for questionNum, score, and seconds left.
let time = document.querySelector('.time');
let scores = document.querySelector('.scores');
let secondsLeft = 60;

let start = document.querySelector('.btnStart');
let back = document.querySelector('.btnback');
let clear = document.querySelector('.btnClear');
let submit = document.querySelector('.btnsubmit');
let title = document.querySelector('.game-title');
let quiz = document.querySelector('.container');

let scoreScreen = document.querySelector('.high-score-list');
let scoreMenu = document.querySelector('.score-screen');
let userScore = document.querySelector('.user-score');
let finalScore = document.querySelector('.scored-points');
let initials = document.getElementById('initials');

let questionNum = 0;
let score = 0;

let question = document.querySelector('#question');
let answerA = document.querySelector('#answerA');
let answerB = document.querySelector('#answerB');
let answerC = document.querySelector('#answerC');
let answerD = document.querySelector('#answerD');
let guess = document.querySelector('#guess');

function setTime(){
    let quizTimer = setInterval(function(){
        title.style.display = 'none';
        quiz.hidden = false;
        secondsLeft--;
        time.textContent = 'Seconds Left:' + ' ' + secondsLeft;

        if (secondsLeft <= 0){
            clearInterval(quizTimer);
            questionScoring();
        }
    }, 1000); 
}

function questionStart(){
    if (questionNum === questions.length){
        return questionScoring();
    }
    // fill in questions + answers.
    question.textContent = questions[questionNum].question;
    answerA.textContent = questions[questionNum].options[0];
    answerB.textContent = questions[questionNum].options[1];
    answerC.textContent = questions[questionNum].options[2];
    answerD.textContent = questions[questionNum].options[3];
}

// variable to hold the questions and options + answer.
const questions = [
    //Question 1
    {
        question: 'What team won the 2023 Stanley Cup? (NHL)',
        options: ['Panthers', 'Golden Knights', 'Lightning', 'Bruins'],
        answer: 'b', 
    },
    //Question 2 
    {
        question: 'What city do the Golden Knights call home?',
        options: ['San Jose, CA', 'Miami, FL', 'Ottawa, Ontario', 'Vegas, NV'],
        answer: 'd', 
    },
    //Question 3 
    {
        question: 'What other teams call Vegas home?',
        options: ['Raiders', 'Chargers', 'Flyers', 'All of the above'],
        answer: 'a', 
    },
    //Question 4
    {
        question: 'What is the minor league team for the Golden Knights?',
        options: ['Gulls', 'Aces', 'Silver Knights', 'FireLights'],
        answer: 'c', 
    },
    //Question 5
    {
        question: 'When did the Golden Knights join the NHL?',
        options: ['2004', '1956', '1994', '2017'],
        answer: 'd', 
    }
]

function nextQuestion (options) {
    if (options === questions[questionNum].answer){
        guess.textContent = "Correct!";
        score++;
    } else {
        guess.textContent = 'Wrong!';
    }

    questionNum++;

    questionStart();

    setTimeout(function(){
        guess.textContent='';
    }, 2000);
}

// after submit push to high scores list, show score menu.
function savedScores(){

    submit.addEventListener('click', function(evt){
        evt.preventDefault();
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

        let newScore = {
            initials: initials.value, 
            score: score
        };

        highScores.push(newScore)

        localStorage.setItem('highScores', JSON.stringify(highScores));
        showScores();
        
        scoreScreen.style.display = 'block';
        scoreMenu.style.display = 'block';
        userScore.style.display = 'none';
    });

};

// show final score.
function questionScoring() {
    quiz.style.display = 'none';
    time.style.display = 'none';
    userScore.style.display = 'block';

    finalScore.textContent = 'Your final score is '+ score;
    
    savedScores();
}

// showScores add score to list and show.
function showScores(){
    title.style.display = 'hidden';
    userScore.style.display = 'hidden';
    scoreScreen.style.display = 'block';
    scoreMenu.style.display = 'flex';
    
    let listScores = JSON.parse(localStorage.getItem('highScores')) || [];

    scoreScreen.innerHTML = listScores
        .map(score => {
            return `<li class="score">${score.initials} - ${score.score}</li>`;
        }).join("");
}

// event listeners
start.addEventListener('click', function(){
    questionStart();
    setTime();
});

scores.addEventListener('click', function(){
    userScore.style.display ='none';
    title.style.display = 'none';
    showScores();
});

clear.addEventListener('click', function(){
    localStorage.clear();
    document.location.reload();
});

back.addEventListener('click', function(){
    document.location.reload();
    title.style.display = 'block';
})