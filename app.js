const questions = [
    {
        question: "Which of the following is used to read an HTML page and render it?",
        answers: [
            {text: "Web server", correct: false},
            {text: "Web network", correct: false},
            {text: "Web matrix", correct: false},
            {text: "Web browser", correct: true},
        ]
    },

    {
        question: "Which attribute is not essential under iframe?",
        answers: [
            {text: "frameborder", correct: true},
            {text: "width", correct: false},
            {text: "height", correct: false},
            {text: "src", correct: false},
        ]
    },

    {
        question: "Which Element is used for or styling HTML5 layout?",
        answers: [
            {text: "CSS", correct: true},
            {text: "jQuery", correct: false},
            {text: "JavaScript", correct: false},
            {text: "Php", correct: false},
        ]
    },

    {
        question: "Which of the following is used to save an HTML file?",
        answers: [
            {text: ".hl", correct: false},
            {text: ".html", correct: true},
            {text: ".htl", correct: false},
            {text: ".h", correct: false},
        ]
    },

    {
        question: "In which part of the HTML metadata is contained? ",
        answers: [
            {text: "head tag", correct: true},
            {text: "body tag", correct: false},
            {text: "html tag", correct: false},
            {text: "title tag", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz(){  
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currQuestionIndex++;
    if(currQuestionIndex < questions.length){
        showQuestions();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();

