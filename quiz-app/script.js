document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { question: "What is 2 + 2?", options: ["2", "3", "4", "5"], answer: "4" },
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "What is 5 * 3?", options: ["15", "20", "10", "5"], answer: "15" }
    ];
    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('quiz-screen').classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        setupOptions();
    }

    function setupOptions() {
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        document.getElementById('question').textContent = questions[currentQuestionIndex].question;
        questions[currentQuestionIndex].options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.onclick = function () { selectOption(option, optionElement); };
            optionsContainer.appendChild(optionElement);
        });
        document.getElementById('next-button').disabled = true; // Disable Next button initially
    }

    function selectOption(selectedOption, optionElement) {
        const question = questions[currentQuestionIndex];
        let options = document.querySelectorAll('.option');
        options.forEach(opt => {
            opt.classList.remove('selected'); // Remove selected from all options
            opt.onclick = null; // Disable further clicks on all options
        });

        optionElement.classList.add('selected');
        document.getElementById('next-button').disabled = false; // Enable the Next button

        if (selectedOption === question.answer) {
            optionElement.classList.add('correct');
            score++;
        } else {
            optionElement.classList.add('wrong');
        }
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            setupOptions();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('end-screen').classList.remove('hidden');
        document.getElementById('final-score').textContent = `Your final score is: ${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        document.getElementById('end-screen').classList.add('hidden');
        startQuiz();
    }

    document.getElementById('next-button').onclick = nextQuestion;
    document.getElementById('start-screen').querySelector('button').onclick = startQuiz;
    document.getElementById('end-screen').querySelector('button').onclick = restartQuiz;
    startQuiz(); // Start the quiz automatically when the page loads
});
