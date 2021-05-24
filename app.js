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
      q1: 'What is coding? ',
      q2: 'What do HTML stand for?',
      q3: 'Code is made up of?',
      q4: 'What do CSS stand for?',
      q5: "What is HTML seen on?",
      q6: 'What do CSS mean?',
      q7: "www stands for?",
      q8:"What do you use to see HTML code?",
      q9:"What can you make with HTML?",
      q10:"How can you see CSS?"
    },
    options: {
      q1: ['Programming for web and mobile apps', 'Computer programs', 'Application design', 'Creator of many programs'],
      q2: ['Hypertext Make Learning', 'Hypertext Markup Language', 'Help Makeup List', 'none'],
      q3: ['Words amd numbers', 'Words and signs', 'Numbers and letters', 'None'],
      q4: ['Cascading Style Sheets', 'Creative Style Sheet', 'Create Stair Style', 'Cascading Style Share'],
      q5: ['Www.','Com','World wed web','None'],
      q6: ['A language that describes the style of an HTML','A language that makes html','Go','None'],
      q7: ['World wide web', 'World western web', 'Wide working web','World wide wed'],
      q8: ['Browser', 'Visual studio code', 'World wide web','None'],
      q9:['Websites', 'Games', 'Mobile apps','All of the above'],
      q10:['Www', 'Html', 'Com','None'],
    },
    answers: {
      q1: 'Computer programming for web and mobile applications',
      q2: 'Hypertext Markup Language',
      q3: 'Words amd numbers',
      q4: 'Cascading Style Sheets',
      q5: 'Www.',
      q6: 'A language that describes the style of an HTML',
      q7: 'World wide web',
      q8:'Browser',
      q9:'All of the above',
      q10:'Html',
    },
    
    startGame: function(){

    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
     
      $('#game').show();
      
    
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
        
    
        $('#game').hide();
        
      
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

// button

function goBack() {
  window.history.back();
}
  





















