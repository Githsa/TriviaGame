$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going cadet', 'On the money astrophysicist', "To Infinity!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "who discovered america?",
            "c": ["Christopher Columbus", "Francisco Pizarro", "Diego de Almagro"],
            "answer": 0
        },
        // question 2
        {
            "q": "Who wrote the Pledge of Allegiance of the United States?",
            "c": ["Francis Bellamy", "George Washington", "Thomas Jefferson"],
            "answer": 0
        },
        // question 3
        {
            "q": "Napoleon suffered defeat at Waterloo in what year?",
            "c": ["1810", "1910", "1815"],
            "answer": 2
        },
        // question 4
        {
            "q": "What was the treaty that ended WWI that laid some of the unrest that would later explode into WWII?",
            "c": ["Paris Peace Accords", "Treaty of Brest-Litovsk", "Treaty of Versailles"],
            "answer": 2
        },
        // question 5
        {
            "q": "What event began World War II?",
            "c": ["Invasion of Poland", "Pearl Harbor", "Battle of Britain"],
            "answer": 0
        },
        // question 6
        {
            "q": "What famous dictator was assasinated on the Ides of March?",
            "c": ["Adolf Hitler", "Julius Caesar", "Benito Mussolini"],
            "answer": 1
        },
        // question 7
        {
            "q": "What is the largest ethnic group in the Middle East?",
            "c": ["Christians", "Arabs", "Jews"],
            "answer": 1
        },
        // question 8
        {
            "q": "The Missouri Compromise was the act that...",
            "c": ["Granted statehood to Missouri ", "Settled the boundary dispute between Missouri and Kansas", "Admitted Maine into the Union as a free state and Missouri as a slave state"],
            "answer": 2
        },
        // question 9
        {
            "q": "The purpose of the authors of The Federalists papers was to:",
            "c": ["Gain ratification of the U.S. Constitution", "Establish a strong, free press in the colonies", "Establish a strong free press in the colonies"],
            "answer": 0
        },
        // question 10
        {
            "q": "Which Patriot leader organized the Boston Tea Party in 1773?",
            "c": ["George Washington", "Samuel Adams", "Benjaming Franklin"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});