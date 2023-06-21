const quizData = [
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(typeof null);",
    choices: ["object", "null", "undefined", "function"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(1 + '1');",
    choices: ["11", "2", "undefined", "NaN"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(0.1 + 0.2 === 0.3);",
    choices: ["true", "false"],
    correctAnswer: 1
  },
  {
    question: "What is the output of the following code snippet?",
    code: "function foo() {\n  console.log(this);\n}\nfoo();",
    choices: ["Window object", "undefined", "null", "foo function"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(Math.max([2, 4, 6]));",
    choices: ["6", "undefined", "NaN", "Error"],
    correctAnswer: 2
  },
  {
    question: "What is the output of the following code snippet?",
    code: "const person = {\n  name: 'John',\n  age: 30\n};\nconsole.log(person.name);",
    choices: ["'John'", "'name'", "'person'", "undefined"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "const x = 10;\nfunction foo() {\n  console.log(x);\n  const x = 20;\n}\nfoo();",
    choices: ["10", "20", "undefined", "ReferenceError"],
    correctAnswer: 3
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(2 + 3 * 4);",
    choices: ["14", "20", "10", "23"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log('2' + 3 * 4);",
    choices: ["24", "14", "23", "212"],
    correctAnswer: 3
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(typeof NaN);",
    choices: ["number", "undefined", "NaN", "object"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(Array.isArray([]));",
    choices: ["true", "false"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "console.log(1 === '1');",
    choices: ["true", "false"],
    correctAnswer: 1
  }
];

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionElement = document.getElementById("question");
const codeElement = document.getElementById("code");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const resultElement = document.getElementById("result");
const explanationLink = document.getElementById("explanation-link");
const explanationTable = document.getElementById("explanation-table");

let currentQuestion = 0;
let score = 0;
let explanations = [];

function showQuestion() {
  const quiz = quizData[currentQuestion];
  questionElement.innerText = quiz.question;
  codeElement.innerHTML = `<code class="language-javascript">${quiz.code}</code>`;

  Prism.highlightAll();

  choicesElement.innerHTML = "";
  for (let i = 0; i < quiz.choices.length; i++) {
    const choice = quiz.choices[i];
    const li = document.createElement("li");
    li.innerText = choice;
    li.dataset.index = i;
    li.addEventListener("click", selectAnswer);
    choicesElement.appendChild(li);
  }
}

function selectAnswer(event) {
  const selectedChoice = event.target;
  const selectedAnswer = selectedChoice.dataset.index;

  const quiz = quizData[currentQuestion];
  const correctAnswer = quiz.correctAnswer;

  if (selectedAnswer == correctAnswer) {
    score++;
    explanations.push(true);
  } else {
    explanations.push(false);
  }

  // Highlight the selected option
  const choices = choicesElement.getElementsByTagName("li");
  for (let i = 0; i < choices.length; i++) {
    choices[i].classList.remove("selected");
  }
  selectedChoice.classList.add("selected");

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    isAllQuestionsAttempted = true;
    submitButton.style.display = "block"; // Display the submit button after all questions are attempted
    choicesElement.classList.add("disable-click"); // Disable further selection of options
  }
}

// function showResult() {
//   quizContainer.style.display = "none";
//   resultContainer.style.display = "block";
//   resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;

//   // Generate explanation table
//   explanationTable.innerHTML = "";
//   for (let i = 0; i < quizData.length; i++) {
//     const quiz = quizData[i];
//     const explanationRow = document.createElement("tr");
//     explanationRow.innerHTML = `
//       <td>${i + 1}</td>
//       <td>${quiz.question}</td>
//       <td>${quiz.choices[quiz.correctAnswer]}</td>
//       <td>${explanations[i] ? "Correct" : "Incorrect"}</td>
//     `;
//     explanationTable.appendChild(explanationRow);
//   }

//   // Show the explanation link
//   explanationLink.style.display = "block";
// }


// function showResult() {
//   quizContainer.style.display = "none";
//   resultContainer.style.display = "block";
//   resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;

//   // Generate explanation table
//   const explanationTableBody = document.getElementById("explanation-table");
//   explanationTableBody.innerHTML = "";
//   for (let i = 0; i < quizData.length; i++) {
//     const quiz = quizData[i];
//     const explanationRow = document.createElement("tr");
//     explanationRow.innerHTML = `
//       <td>${i + 1}</td>
//       <td>${quiz.question}</td>
//       <td>${quiz.choices[quiz.correctAnswer]}</td>
//       <td>${explanations[i] ? "Correct" : "Incorrect"}</td>
//     `;
//     explanationTableBody.appendChild(explanationRow);
//   }

//   // Show the explanation link
//   explanationLink.style.display = "block";
// }

function showResult() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;

  // Generate explanation table
  const explanationTableBody = document.getElementById("explanation-table");
  explanationTableBody.innerHTML = "";
  for (let i = 0; i < quizData.length; i++) {
    const quiz = quizData[i];
    const explanationRow = document.createElement("tr");
    explanationRow.innerHTML = `
      <td>${i + 1}</td>
      <td>${quiz.question}</td>
      <td>${quiz.choices[quiz.correctAnswer]}</td>
      <td>${explanations[i] ? "Correct" : "Incorrect"}</td>
    `;
    explanationTableBody.appendChild(explanationRow);
  }

  // Construct the URL with the explanations array as a query parameter
  const explanationsParam = encodeURIComponent(JSON.stringify(explanations));
  const explanationLink = document.getElementById("explanation-link");
  explanationLink.href = `explanation.html?explanations=${explanationsParam}`;

  // Show the explanation link
  explanationLink.style.display = "block";
}


// function restartQuiz() {
//   currentQuestion = 0;
//   score = 0;
//   explanations = [];
//   quizContainer.style.display = "block";
//   resultContainer.style.display = "none";
//   explanationLink.style.display = "none"; // Hide the explanation link when restarting the quiz
//   showQuestion();
// }

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  explanations = [];
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  explanationLink.style.display = "none"; // Hide the explanation link when restarting the quiz

  submitButton.style.display = "none"; // Hide the submit button when restarting the quiz
  choicesElement.classList.remove("disable-click"); // Enable selection of options when restarting the quiz

  showQuestion();
}


submitButton.style.display = "none"; // Hide the submit button initially
submitButton.addEventListener("click", showResult);
restartButton.addEventListener("click", restartQuiz);

showQuestion();
