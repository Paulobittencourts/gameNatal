export class QuizGame{
    constructor(questions){
        this.questions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion(){
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(selectedOption){
        const currentQuestion = this.getCurrentQuestion();
        if(selectedOption === currentQuestion.correct){
            this.score += 1;
            return true;
        }
        return false;
    }

    nextQuestion(){
        this.currentQuestionIndex++;
        return this.currentQuestionIndex < this.questions.length;
    }

    getFinalScore(){
        return{
            totalScore: this.score,
            prize: `R$ ${this.score}`
        }
    }
}
