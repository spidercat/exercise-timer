var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {
		
		// Set default volume as on
  	$('#volume-switch').prop('checked', true)	

    // Global variables (because I am a terrible person)
    $scope.roundsLeft = 1;

    // Count down variables
    $scope.breakLeft = ['00', ':', '10'];
    $scope.timeLeft = ['00', ':', '20'];

    $scope.breakLeftJoined = $scope.breakLeft.join('');
    $scope.timeLeftJoined = $scope.timeLeft.join('');

    // Option variables. Get copied for tempArray.
    $scope.rounds = 8;
    $scope.timeOff = ['00', ':', '10'];
    $scope.timeOn = ['00', ':', '20'];

    $scope.timeOnJoined = $scope.timeOn.join('');
    $scope.timeOffJoined = $scope.timeOff.join('');
	
		// If interval running (to clear correct interval)
		var breakInterval = false;
		var timeInterval = false;
	
    // Put 0 if digit less than 10
    function minTwoDigits(n) {
      return (n < 10 ? '0' : '') + n;
    }

    // Reduce time by one second
    function subtractTime(time) {
      var seconds = parseInt(time[2]);
      var minutes = parseInt(time[0]);
      if (seconds == '00') {
        if (minutes == '00') {
          time[0] = minTwoDigits(minutes);
        } else {
          time[2] = '59';
          time[0] = minTwoDigits(minutes - 1);
        }
      } else {
        time[2] = minTwoDigits(seconds - 1);
      }
    }

    // Increase time by one second
    function addTime(time) {
      var seconds = parseInt(time[2]);
      var minutes = parseInt(time[0]);
      if (seconds == '59') {
        time[2] = '00';
        time[0] = minTwoDigits(minutes + 1);
      } else {
        time[2] = minTwoDigits(seconds + 1);
      }
    }

    // User adjusted rounds value
    $scope.changeRounds = function(value) {
      var numRounds = parseInt($scope.rounds);
      if ((value === 'minus') && (numRounds != 0)) {
        $scope.rounds = numRounds - 1;
      } else if (value === 'plus') {
        $scope.rounds = numRounds + 1;
      }
    }

    // User adjusted timeOn value
    $scope.changeTimeOn = function(value) {
      if (value === 'minus') {
        subtractTime($scope.timeOn);
      } else if (value === 'plus') {
        addTime($scope.timeOn);
      }
      $scope.timeOnJoined = $scope.timeOn.join('');
      var temp = $scope.timeOn.slice();
      $scope.timeLeft = temp;
      $scope.timeLeftJoined = $scope.timeOnJoined;
      $scope.$apply;
    }

    // User adjusted timeOff value
    $scope.changeTimeOff = function(value) {
      if (value === 'minus') {
        subtractTime($scope.timeOff);
      } else if (value === 'plus') {
        addTime($scope.timeOff);
      }
      $scope.timeOffJoined = $scope.timeOff.join('');
      var temp = $scope.timeOff.slice();
      $scope.breakLeft = temp;
      $scope.breakLeftJoined = $scope.timeOffJoined;
      $scope.$apply;
    }

    // Todo: Set up for minutes
    $scope.startClock = function() {
      $('#pause-button').removeClass('hidden');
      $('#start-button').addClass('hidden');
      if ($scope.roundsLeft <= $scope.rounds) {

        if ($('#time-left').hasClass('hidden')) {
          breakLeftInterval = setInterval(function() {
						breakInterval = true;
            var minutes = parseInt($scope.breakLeft[0]);
            var seconds = parseInt($scope.breakLeft[2]);
            if (seconds != 00) {
              $scope.breakLeft[2] = minTwoDigits(seconds - 1);
              $scope.breakLeftJoined = $scope.breakLeft.join('');
              $scope.$apply();
              if ((seconds >= 02) && (seconds <= 04) && ($('#volume-switch').prop('checked'))) {
                var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
              } else if ((seconds == 01) && ($('#volume-switch').prop('checked'))){
                var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
              }
            } else if ((seconds == 00) && (minutes != 00)) {
              $scope.breakLeft[0] = minTwoDigits(minutes - 1);
              $scope.breakLeft[2] = '59';
              $scope.breakLeftJoined = $scope.breakLeft.join('');
              $scope.$apply();
            } else {
              $('#time-left').toggleClass('hidden');
              $('#break-left').toggleClass('hidden');
              $('#current-timer').css('background-color', '#a5d6a7');
              var tempArray = $scope.timeOff.slice();
              $scope.breakLeft = tempArray;
              $scope.breakLeftJoined = $scope.timeOffJoined;
              $scope.$apply;
              clearInterval(breakLeftInterval);
							breakInterval = false;
              $scope.startClock();
            }

          }, 1000);

        } else {
          timeLeftInterval = setInterval(function() {
						timeInterval = true;
            var seconds = parseInt($scope.timeLeft[2]);
            var minutes = parseInt($scope.timeLeft[0]);
            if (seconds != 00) {
              $scope.timeLeft[2] = minTwoDigits(seconds - 1);
              $scope.timeLeftJoined = $scope.timeLeft.join('');
              $scope.$apply();
              if ((seconds >= 02) && (seconds <= 04) && ($('#volume-switch').prop('checked'))) {
                var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
              } else if ((seconds == 01) && ($('#volume-switch').prop('checked'))) {
                var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
              }
            } else if ((seconds == 00) && (minutes != 00)) {
              $scope.timeLeft[0] = minTwoDigits(minutes - 1);
              $scope.timeLeft[2] = '59';
              $scope.timeLeftJoined = $scope.timeLeft.join('');
              $scope.$apply();
            } else {

							$scope.roundsLeft = $scope.roundsLeft + 1;

              $('#break-left').toggleClass('hidden');
              $('#time-left').toggleClass('hidden');
              $('#current-timer').css('background-color', '#ef9a9a');
              var tempArray = $scope.timeOn.slice();
              $scope.timeLeft = tempArray;
              $scope.timeLeftJoined = $scope.timeOnJoined;
              $scope.$apply;
              clearInterval(timeLeftInterval);
							timeInterval = false;
              // Reset break
              $scope.startClock();
            }
          }, 1000);
        }

      } else {
					$scope.clear();
      }
    }
		
		// Clear correct interval
		function clearActiveInterval() {
			if (timeInterval) {
				clearInterval(timeLeftInterval);
				timeInterval = false;
			} else if (breakInterval) {
				clearInterval(breakLeftInterval);
				breakInterval = false;
			}
		}

    // Pause timer
    $scope.pauseClock = function() {
			clearActiveInterval()
      $('#pause-button').addClass('hidden');
      $('#start-button').removeClass('hidden');
    }

    $scope.clear = function() {
      var temp = $scope.timeOff.slice();
      $scope.breakLeft = temp;
      $scope.breakLeftJoined = $scope.timeOffJoined;

      $scope.roundsLeft = 1;

      var tempArray = $scope.timeOn.slice();
      $scope.timeLeft = tempArray;
      $scope.timeLeftJoined = $scope.timeOnJoined;
      $scope.$apply;
			
			$('#pause-button').addClass('hidden');
      $('#start-button').removeClass('hidden');
			clearActiveInterval();
    }

  }]) // End controller