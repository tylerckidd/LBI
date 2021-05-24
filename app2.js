$(document).ready(function(){
  
   
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
   
    questions: {
      q1: 'What is physical therapy? ',
      q2: 'Can physical therapists treat vertigo?',
      q3: 'What happens in a therapy session?',
      q4: 'Did physical therapy begin as a female-only profession?',
      q5: "What are the five practice areas?",
      q6: 'Can physical therapy treat pain with mirrors?',
      q7: "Should physical therapy cause pain?",
      q8:"Physical therapists were originally known as what?",
      q9:"When did the demand increase for physical therapist?",
      q10:"What degree do you need to be a physical therapist?"
    },
    options: {
      q1: ['The treatment of disease, Injury, or deformity', 'Treatment of the mind'],
      q2: ['Yes', 'No'],
      q3: ['Stretching or massaging ', 'Directed manual force to improve mobility', 'Hands-on techniques', 'All of the above'],
      q4: ['Yes', 'No'],
      q5: ['Orthopedic','Geriatric','Pediatric','Neurological','Cardiopulmonary', 'All of the above'],
      q6: ['Yes', 'No'],
      q7: ['Yes', 'No'],
      q8: ['Massage aides', 'Reconstruction aides', 'WWI Workers','None'],
      q9:['Early 1880s', '1986', 'Late 1960s and early 1970s','None'],
      q10:['Associates degree', 'Masters degree', 'None','Bachelor’s degree'],
    },
    answers: {
      q1: 'The treatment of disease, injury, or deformity',
      q2: 'Yes',
      q3: 'All of the above',
      q4: 'Yes',
      q5: 'All of the above',
      q6: 'Yes',
      q7: 'No',
      q8:'Reconstruction aides',
      q9:'Late 1960s and early 1970s',
      q10:'Bachelor’s degree',
    },
    
    startGame: function(){

    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
     
      $('#game2').show();
      
    
      $('#results').html('');
      
     
      $('#timer').text(trivia.timer);
      
  
      $('#start').hide();
  
      $('#remaining-time').show();
      
     
      trivia.nextQuestion();
      
    },
  
    nextQuestion : function(){
 
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
    
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
 
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
     
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
  
    timerRunning : function(){
     
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
  
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
     
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
    
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
    
        $('#game2').hide();
        
      
        $('#start').show();
      }
      
    },
   
    guessChecker : function() {
      
    
      var resultId;
      
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
     
      if($(this).text() === currentAnswer){
    
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
     
      else{
     
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Hopefully you get it next time! '+ currentAnswer +'</h3>');
      }
      
    },
   
    guessResult : function(){
      
    
      trivia.currentSet++;
      
     
      $('.option').remove();
      $('#results h3').remove();
      
    
      trivia.nextQuestion();
       
    }
  
  }

  





















