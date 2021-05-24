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
      q1: 'What is a registered nurse? ',
      q2: 'The first known nursing school was established where?',
      q3: 'Who was the first woman to earn a nursing diploma in the U.S.?',
      q4: 'What do registed nurses do?',
      q5: "What degree do you need to become a RN?",
      q6: 'When was the first U.S school of nursing established?',
      q7: "How do RN get their licenses to nurse?",
      q8:"Is general nursing practices universal all over the world?",
      q9:"Nursing is the largest health care profession",
      q10:"Is there a shortage of nurses?"
    },
    options: {
      q1: ['Medical professional', 'Doctor', 'Treatment specialist', 'None'],
      q2: ['USA', 'India', 'China', 'Russia'],
      q3: ['Laura Gibson ', 'Mary Brutt', 'Linda Richards', 'Briana Clark'],
      q4: ['Assist with procedures', 'Draw blood and collect lab work', 'None', 'All of the above'],
      q5: ['Associates','Bachelors','Masters','None','Associates or Bachelors'],
      q6: ['1862', '1996','1812','1973'],
      q7: ['Paying for it', 'An exam','College', 'None'],
      q8: ['Yes', 'No'],
      q9:['True', 'False'],
      q10:['Yes', 'No'],
    },
    answers: {
      q1: 'Medical professional',
      q2: 'India',
      q3: 'Linda Richards',
      q4: 'All of the above',
      q5: 'Associates or Bachelors',
      q6: '1862',
      q7: 'An exam',
      q8:'Yes',
      q9:'True',
      q10:'Yes',
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

  





















