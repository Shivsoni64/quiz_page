$(document).ready(function () {
    const questions = {
      q1: 'c',
      q2: 'c',
      q3: 'c',
      q4: 'c',
      q5: 'c',
      q6: 'c',
      q7: 'c',
      q8: 'c',
      q9: 'c',
      q10: 'c',
    };

    const quizForm = $('#quiz-form');
    const results = $('#results');
    const tryAgainButton = $('#try-again');
    const countdownSpan = $('#countdown');
    let countdown = 60;

    const timerInterval = setInterval(function () {
      countdown--;
      countdownSpan.text(countdown);
      if (countdown === 0) {
        clearInterval(timerInterval);
        quizForm.submit();
      }
    }, 1000);

    quizForm.submit(function (e) {
      e.preventDefault();
      clearInterval(timerInterval); // Stop the timer
      const score = checkAnswers(questions);
      displayResults(score);
      highlightIncorrectAnswers(questions);
      tryAgainButton.show();
    });

    tryAgainButton.click(function () {
      resetQuiz();
      countdown = 60; // Reset the timer
      countdownSpan.text(countdown);
      tryAgainButton.hide();
      timerInterval = setInterval(function () {
        countdown--;
        countdownSpan.text(countdown);
        if (countdown === 0) {
          clearInterval(timerInterval);
          quizForm.submit();
        }
      }, 1000);
    });

    function checkAnswers(questions) {
      let score = 0;
      for (const key in questions) {
        const userAnswer = $(`input[name=${key}]:checked`).val();
        if (userAnswer === questions[key]) {
          score++;
        }
      }
      return score;
    }


    function displayResults(score) {
      results.show();
      if (score === Object.keys(questions).length) {
        results.html(`<p class="correct">Your Score: ${score} out of ${Object.keys(questions).length}</p>`);
      } else {
        results.html(`<p class="incorrect">Your Score: ${score} out of ${Object.keys(questions).length}</p>`);
      }
    }

    function highlightIncorrectAnswers(questions) {
      for (const key in questions) {
        const userAnswer = $(`input[name=${key}]:checked`).val();
        if (userAnswer !== questions[key]) {
          $(`input[name=${key}]:checked + label`).addClass('incorrect');
        }
      }
    }

    function resetQuiz() {
      results.hide();
      $('label.incorrect').removeClass('incorrect');
    }

  });