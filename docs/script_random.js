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
    },
    {
        question: "太陽系で最も大きな惑星はどれですか？",
        answers: [
            { text: "地球", correct: false },
            { text: "火星", correct: false },
            { text: "木星", correct: true },
            { text: "金星", correct: false }
        ]
    },
    {
        question: "日本の最長の川は何ですか？",
        answers: [
            { text: "信濃川", correct: true },
            { text: "長良川", correct: false },
            { text: "利根川", correct: false },
            { text: "石狩川", correct: false }
        ]
    },
    {
        question: "エベレスト山の標高は何メートルですか？",
        answers: [
            { text: "8848メートル", correct: true },
            { text: "5000メートル", correct: false },
            { text: "10000メートル", correct: false },
            { text: "7500メートル", correct: false }
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
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    feedbackMessage.classList.add('hide');
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    nextButton.textContent = "次へ";  // 「次へ」ボタンに設定
    nextButton.removeEventListener('click', restartQuiz);  // イベントリセット
    
    // クイズを開始する前に questions 配列をシャッフル
    shuffleArray(questions);

    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    feedbackMessage.textContent = ''; 

    const shuffledAnswers = shuffleArray(question.answers);

    shuffledAnswers.forEach(answer => {
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    // フィードバックメッセージの表示
    if (correct) {
        feedbackMessage.textContent = "正解！";
        feedbackMessage.classList.add('correct');
        feedbackMessage.classList.remove('incorrect');
        score++;
    } else {
        feedbackMessage.textContent = "不正解…";
        feedbackMessage.classList.add('incorrect');
        feedbackMessage.classList.remove('correct');
        // 正しい答えも表示
        const correctAnswer = Array.from(answerButtons.children).find(button => button.dataset.correct === 'true');
        feedbackMessage.textContent += ` 正解は「${correctAnswer.innerText}」です。`;
    }
    feedbackMessage.classList.remove('hide');

    // 他のボタンを無効化
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextButton.classList.remove('hide');
        nextButton.textContent = "次へ"; 
        nextButton.addEventListener('click', showNextQuestion);
    } else {
        nextButton.textContent = "スコアを表示";
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', showScore);
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
    nextButton.textContent = "もう一度";
    nextButton.classList.remove('hide');
    nextButton.removeEventListener('click', showScore);
    nextButton.addEventListener('click', restartQuiz);
}

function restartQuiz() {
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    startScreen.classList.remove('hide');
    questionContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    feedbackMessage.classList.add('hide');
}
