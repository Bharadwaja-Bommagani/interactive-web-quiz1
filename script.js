// Global variables
let timerInterval;
let timeRemaining = 30; // Timer starts from 30 seconds
let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let selectedOption = null; // Keeps track of selected option

// Start the quiz
function startQuiz() {
    // Hide the start screen and show the quiz screen
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('quiz-screen').classList.remove('hide');
    
    // Fetch or initialize quiz questions based on difficulty
    const difficulty = document.getElementById('difficulty-selector').value;
    questions = getQuestionsByDifficulty(difficulty);

    // Display the first question
    displayQuestion();
}

// Display the current question
function displayQuestion() {
    // Reset the timer for each question
    timeRemaining = 30;
    document.getElementById('timer').textContent = `Time Remaining: ${timeRemaining}s`;

    // Start the timer
    startTimer();

    // Display question number
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1}`;

    // Display the question and options
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;

    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = ''; // Clear previous options
    question.options.forEach(option => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = option;
        li.onclick = () => selectOption(li, option);
        optionsList.appendChild(li);
    });
}

// Start the timer and update it every second
function startTimer() {
    // Clear the previous timer interval
    clearInterval(timerInterval);
    
    // Set a new interval to update the timer every second
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = `Time Remaining: ${timeRemaining}s`;

        // Stop the timer when it reaches 0
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up for this question!");
            nextQuestion(); // Move to next question automatically
        }
    }, 1000);
}

// Select an option
function selectOption(li, option) {
    // If option is already selected, allow user to change it
    if (selectedOption !== null) {
        selectedOption.classList.remove('selected');
    }

    // Mark the selected option
    li.classList.add('selected');
    selectedOption = li;
    checkAnswer(option);
}

// Check the answer and update score
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    document.getElementById('next-btn').disabled = false; // Enable Next button
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // Display next question
    } else {
        showResult(); // End the quiz and show the result
    }
}

// Show the final result
function showResult() {
    document.getElementById('quiz-screen').classList.add('hide');
    document.getElementById('result-screen').classList.remove('hide');
    document.getElementById('score-text').textContent = `You scored ${score} out of ${questions.length}`;
}

// Restart the quiz
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('result-screen').classList.add('hide');
    document.getElementById('start-screen').classList.remove('hide');
}

// Get questions based on difficulty level
function getQuestionsByDifficulty(difficulty) {
    const questions = {
        easy: [
            {
                question: "What does HTML stand for?",
                options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "HyperText Making Language"],
                correctAnswer: "HyperText Markup Language"
            },
            {
                question: "Which tag is used to create a hyperlink in HTML?",
                options: ["<a>", "<link>", "<hyperlink>", "<href>"],
                correctAnswer: "<a>"
            },
            {
                question: "What is the default display property of a <div> element in CSS?",
                options: ["inline", "block", "none", "flex"],
                correctAnswer: "block"
            },
            {
                question: "Which of the following is used to link an external CSS file in HTML?",
                options: ["<link rel=\"stylesheet\" href=\"styles.css\">", "<css src=\"styles.css\">", "<style href=\"styles.css\">", "<script href=\"styles.css\">"],
                correctAnswer: "<link rel=\"stylesheet\" href=\"styles.css\">"
            },
            {
                question: "Which JavaScript function is used to display an alert box?",
                options: ["alert()", "msg()", "popup()", "notify()"],
                correctAnswer: "alert()"
            }
        ],
        medium: [
            {
                question: "Which CSS property is used to change the background color of an element?",
                options: ["color", "bg-color", "background-color", "background"],
                correctAnswer: "background-color"
            },
            {
                question: "How do you create a function in JavaScript?",
                options: ["function: myFunction() {}", "function myFunction() {}", "func myFunction() {}", "create function myFunction() {}"],
                correctAnswer: "function myFunction() {}"
            },
            {
                question: "What is the purpose of the z-index property in CSS?",
                options: ["To specify the size of an element", "To control the stacking order of elements", "To add a shadow to elements", "To set the border of an element"],
                correctAnswer: "To control the stacking order of elements"
            },
            {
                question: "What does the this keyword refer to in JavaScript?",
                options: ["The current object", "The window object", "The function where it is used", "The parent object"],
                correctAnswer: "The current object"
            },
            {
                question: "How can you add a comment in a CSS file?",
                options: ["<!-- This is a comment -->", "/* This is a comment */", "// This is a comment", "# This is a comment"],
                correctAnswer: "/* This is a comment */"
            }
        ],
        hard: [
            {
                question: "Which of the following is the correct syntax to create a CSS Grid layout?",
                options: ["display: flex;", "display: grid;", "display: block;", "display: inline-block;"],
                correctAnswer: "display: grid;"
            },
            {
                question: "What is the difference between null and undefined in JavaScript?",
                options: ["null is an object, while undefined is a primitive value.", "null and undefined are the same in JavaScript.", "null is undefined, while undefined is null.", "null refers to an uninitialized variable, and undefined refers to a variable that has no value."],
                correctAnswer: "null is an object, while undefined is a primitive value."
            },
            {
                question: "Which of the following is true about JavaScript closures?",
                options: ["A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.", "A closure is a function that cannot access its outer scope.", "A closure is only accessible within the function where it is declared.", "A closure refers to the entire function that has no parameters."],
                correctAnswer: "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope."
            },
            {
                question: "Which CSS property is used to create a responsive grid layout that adapts to screen sizes?",
                options: ["display: flex;", "display: grid;", "grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));", "display: inline-flex;"],
                correctAnswer: "grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));"
            },
            {
                question: "How can you prevent a default action in JavaScript (for example, form submission)?",
                options: ["event.preventDefault();", "event.stopPropagation();", "return false;", "event.stopDefault();"],
                correctAnswer: "event.preventDefault();"
            }
        ]
    };

    return questions[difficulty];
}
