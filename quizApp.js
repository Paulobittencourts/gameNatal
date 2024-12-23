import { QuizGame } from './quizGame.js';
import { questions } from './question.js';

document.addEventListener('DOMContentLoaded', () => {
    const quizGame = new QuizGame(questions);

    const questionElement = document.querySelector('.question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');

    function renderQuestion() {
        const currentQuestion = quizGame.getCurrentQuestion();
        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';

        if (Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0) {
            currentQuestion.options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.textContent = option;
                optionButton.classList.add('option');
                optionButton.onclick = () => {

                    const isCorrect = quizGame.checkAnswer(index);

                    if (isCorrect) {
                        optionButton.classList.add('correct'); 
                    } else {
    
                        optionButton.classList.add('incorrect'); 
                        const correctOptionButton = Array.from(optionsElement.children).find(
                            button => button.textContent === currentQuestion.options[currentQuestion.correct]
                        );
                        if (correctOptionButton) {
                            correctOptionButton.classList.add('correct'); 
                        }
                    }

                    document.querySelectorAll('.option').forEach(button => {
                        button.disabled = true;
                    });

                    
                    setTimeout(() => {
                        if (quizGame.nextQuestion()) {
                            renderQuestion();
                        } else {
                            const result = quizGame.getFinalScore();
                            alert(`Pontuação final: ${result.totalScore}\nPrêmio: ${result.prize}`);
                        }
                    }, 2000); 
                };
                optionsElement.appendChild(optionButton);
            });
        } else {
            console.error("Opções não encontradas ou inválidas na pergunta.");
        }
    }

    nextButton.onclick = () => {
        if (quizGame.nextQuestion()) {
            renderQuestion();
        } else {
            const result = quizGame.getFinalScore();
            alert(`Pontuação final: ${result.totalScore}`);
        }
    };


    renderQuestion();
});
