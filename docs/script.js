const questions = [
    {
        question: "地球は何個の衛星を持っていますか？",
        answers: [
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "0", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "日本の首都は？",
        answers: [
            { text: "大阪", correct: false },
            { text: "東京", correct: true },
            { text: "札幌", correct: false },
            { text: "福岡", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    // クイズを開始する前に初期化
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    feedbackMessage.classList.add('hide');
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    nextButton.textContent = "次へ";  // 「次へ」ボタンに設定
    nextButton.removeEventListener('click', startQuiz);  // イベントリセット
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    feedbackMessage.textContent = ''; 

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        feedbackMessage.textContent = "正解！";
        feedbackMessage.classList.add('correct');
        feedbackMessage.classList.remove('incorrect');
        score++;
    } else {
        feedbackMessage.textContent = "不正解…";
        feedbackMessage.classList.add('incorrect');
        feedbackMessage.classList.remove('correct');
    }
    feedbackMessage.classList.remove('hide');

    currentQuestionIndex++;

    // 最後の問題が終わった後にスコア表示をする
    if (currentQuestionIndex < questions.length) {
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', showNextQuestion);
    } else {
        showScore();
    }
}

function showNextQuestion() {
    feedbackMessage.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showScore() {
    questionContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    feedbackMessage.classList.add('hide');
    scoreContainer.textContent = `あなたのスコア: ${score} / ${questions.length}`;
    scoreContainer.classList.remove('hide');
    nextButton.textContent = "スコアを表示";
    nextButton.classList.remove('hide');
    nextButton.removeEventListener('click', showNextQuestion); // イベントリセット
    nextButton.addEventListener('click', startQuiz);  // もう一度押すと再スタート
}
