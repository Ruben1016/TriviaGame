var questions = [
    {
      question: 'What was the pink rangers name?',
      answers: [
        { answer: 'A. Kimberly Hart', value: true },
        { answer: 'B. Rita Repulsa', value: false },
        { answer: 'C. Angela', value: false },
        { answer: 'D. Trini Kawn', value: false }
      ]
    },
    {
      question: 'What year did the Mighty Morphin Power Rangers premiered?',
      answers: [
        { answer: '2003', value: false },
        { answer: '2010', value: false },
        { answer: '1987', value: false },
        { answer: '1993', value: true }
      ]
    },
    {
      question: 'How many Power Rangers were in Mighty Morphin?',
      answers: [
        { answer: '6', value: true },
        { answer: '8', value: false },
        { answer: '34', value: false },
        { answer: '5', value: false }
      ]
    },
    {
      question: 'Who was the green ranger before becoming the white ranger?',
      answers: [
        { answer: 'Billy Cranston', value: false },
        { answer: 'Adam Park', value: false },
        { answer: 'Tommy Oliver', value: true },
        { answer: "Rocky DeSantos", value: false }
      ]
    },
    {
      question: "Who was the evil witch?",
      answers: [
        { answer: 'Ms. Appleby', value: false },
        { answer: 'Aisha Campbell', value: false },
        { answer: 'Trini kwan', value: false },
        { answer: 'Rita Repulsa', value: true }
      ]
    },
    {
      question: 'Who was the team leader of the power rangers?',
      answers: [
        { answer: 'Tommy Oliver', value: false },
        { answer: 'Zordon', value: false },
        { answer: 'Jason Lee Scott', value: true },
        { answer: 'Zach Taylor', value: false }
      ]
    },
    {
      question: 'Billy Cranston was the _____ ranger?',
      answers: [
        { answer: 'Blue', value: true },
        { answer: 'Black', value: false },
        { answer: 'Yellow', value: false },
        { answer: 'Purple', value: false }
      ]
    }
  ];
  
 
  var game;
  var counter = 0;
  var clock;
  var timer = 30;
  var correctCounter = 0;
  var incorrectCounter = 0;
  var unansweredCounter = 0;
  
  $(document).ready(function() {

    $('.answers').css('visibility', 'hidden');
    $('body').on('click', '.start-btn', function(event) {
      event.preventDefault();
      startGame();
      $('.answers').css('visibility', 'visible');
    });
  
    $('body').on('click', '.answer', function(event) {
      
      chosenAnswer = $(this).text();
      var answerCounter = questions[counter].answers;
  
      var answer = $('.answer');
      for (var i = 0; i < answerCounter.length; i++) {
        if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
          clearInterval(clock);
          var right = $(this).attr('class', 'right-answer answer');
          rightAnswer();
        } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
          clearInterval(clock);
          $(this).attr('class', 'wrong-answer answer');
          $('.first-answer').css('background-color', 'green');
          $('.first-answer').css('color', 'white');
          wrongAnswer();
        }
      }
    });
  
    $('body').on('click', '.reset-button', function(event) {
      event.preventDefault();
      resetGame();
    });
  });
  
  function rightAnswer() {
    correctCounter++;
    $('.time').html(timer);
    $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
    setTimeout(questionCounter, 2000);
  }
  
  function wrongAnswer() {
    incorrectCounter++;
    $('.time').html(timer);
    $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
    setTimeout(questionCounter, 2000);
  }
  
  function unanswered() {
    unanswered++;
    $('.main').append("<p class='times-up'>Time's up!</p>");
    $('.right-answer').css('background-color', 'green');
    $('.times-up')
      .delay(2000)
      .fadeOut(400);
    setTimeout(questionCounter, 2000);
  }
 

  function startGame() {
    $('.start-page').css('display', 'none');
    $('.questions-page').css('visibility', 'visible');
    $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');
  
    $('.question').html(questions[counter].question);
    var showingAnswers =
      '<p class="answer first-answer">' +
      questions[counter].answers[0].answer +
      '</p><p class="answer">' +
      questions[counter].answers[1].answer +
      '</p><p class="answer">' +
      questions[counter].answers[2].answer +
      '</p><p class="answer">' +
      questions[counter].answers[3].answer +
      '</p>';
  
    $('.answers').html(showingAnswers);
  
    timerHolder();
  }
  
  function questionCounter() {
    if (counter < 6) {
      counter++;
      startGame();
      timer = 30;
      timerHolder();
    } else {
      finishGame();
    }
  }
  
 
  function timerHolder() {
    clearInterval(clock);
    clock = setInterval(seconds, 1000);
    function seconds() {
      if (timer === 0) {
        clearInterval(clock);
        unanswered();
      } else if (timer > 0) {
        timer--;
      }
      $('.time').html(timer);
    }
  }
  
  
  function finishGame() {
    var final = $('.main')
       .html("<p>You are now a Power Ranger!<p><br>")
       .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
      .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
    $(final).attr('<div>');
    $(final).attr('class', 'final');
    $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
  }
  
  
  function resetGame() {
    counter = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    timer = 30;
    startGame();
    timerHolder();
  }