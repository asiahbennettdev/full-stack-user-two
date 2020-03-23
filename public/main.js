var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
// Quiz code covid-19
(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    coronaQuestion.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    coronaQuestion.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${coronaQuestion.length}`;
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const coronaQuestion = [
    {
      question: "Which animal did coronavirus spread from?",
      answers: {
        a: "Pigeon",
        b: "Cow",
        c: "Bat",
        d: "Chicken"
      },
      correctAnswer: "c"
    },
    {
      question: "The coronavirus was detected in what city first?",
      answers: {
        a: "Rome",
        b: "Wuhan",
        c: "Tokyo",
        d: "Pensacola"
      },
      correctAnswer: "b"
    },
    {
      question: "Which is NOT a symptom of coronavirus infection?",
      answers: {
        a: "Cough",
        b: "Fever",
        c: "Dry Eyes",
        d: "Fatigue"
      },
      correctAnswer: "c"
    },
    {
      question: "What kind of mask is appropriate to protect against coronavirus?",
      answers: {
        a: "N95 Mask",
        b: "Electric Face Mask",
        c: "Buff Mask",
        d: "R100 Mask"
      },
      correctAnswer: "a"
    },
    {
      question: "There is a cure for COVID-19 formally known as coronavirus?",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "b"
    },
    {
      question: "You can get COVID-19 formally known as coronavirus from packages/mail?",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "b"
    },
    {
      question: "The best way to protect yourself from the coronavirus is to?",
      answers: {
        a: "Take a shot",
        b: "Eat Vitamins",
        c: "Stay indoors",
        d: "Wash hands, cover mouth and nose"
      },
      correctAnswer: "d"
    },
        {
      question: "How long can the coronavirus survive outside a host?",
      answers: {
        a: "Hours",
        b: "Days",
        c: "Minutes",
        d: "Months"
      },
      correctAnswer: "a"
    },
    {
      question: "Are all restaurants in Massachusetts closed until further notice?",
      answers: {
        a: "Yes, you can’t eat out or order food  from any restaurants until April 6",
        b: "No, on-site consumption of food in restaurants is banned until April 6th, but you can still order takeout/ delivery"
      },
      correctAnswer: "b"
    },
    {
      question: "What’s the maximum public gathering size in Massachusetts?",
      answers: {
        a: "10",
        b: "25 except at grocery/ retail",
        c: "30",
        d: "100 except for the State House"
      },
      correctAnswer: "b"
    },
    {
      question: "The MBTA public transportation system will be running it’s normal business hours?",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "b"
    },
    {
      question: "It’s okay to visit senior citizens in nursing homes and long-term care facilities in Massachusetts?",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "b"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();
