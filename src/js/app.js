var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {
		
		// Set default volume as on
  	$('#volume-switch').prop('checked', true)	

    // Rounds object
		$scope.roundsOb = {
			roundsLeft: 1,
			rounds: 8
		};
	
		// If interval running (to clear correct interval)
		var isRunningOb = {
			breakInterval: false,
			timeInterval: false
		};

    // Count down variables
		$scope.countOb = {
    	breakLeft: ['00', ':', '10'],
    	timeLeft: ['00', ':', '20']
		};	
		$scope.countJoinedOb = {	
    	breakLeftJoined: $scope.countOb.breakLeft.join(''),
    	timeLeftJoined: $scope.countOb.timeLeft.join('')
		};

    // Option variables. Get copied for tempArray.
		$scope.optionOb = {
			timeOff: ['00', ':', '10'],
    	timeOn: ['00', ':', '20']
		};
		$scope.optionJoinedOb = {
			timeOnJoined: $scope.optionOb.timeOn.join(''),
    	timeOffJoined: $scope.optionOb.timeOff.join('')
		};
    
	
    // Put 0 if digit less than 10
    function minTwoDigits(n) {
      return (n < 10 ? '0' : '') + n;
    }

    // Reduce time by one second
    function subtractTime(time) {
      var SECONDS = parseInt(time[2]);
      var MINUTES = parseInt(time[0]);
      if (SECONDS == '00') {
        if (MINUTES == '00') {
          time[0] = minTwoDigits(MINUTES);
        } else {
          time[2] = '59';
          time[0] = minTwoDigits(MINUTES - 1);
        }
      } else {
        time[2] = minTwoDigits(SECONDS - 1);
      }
    }

    // Increase time by one second
    function addTime(time) {
      var SECONDS = parseInt(time[2]);
      var MINUTES = parseInt(time[0]);
      if (SECONDS == '59') {
        time[2] = '00';
        time[0] = minTwoDigits(MINUTES + 1);
      } else {
        time[2] = minTwoDigits(SECONDS + 1);
      }
    }

    // User adjusted rounds value
    $scope.changeRounds = function(value) {
      var NUM_ROUNDS = parseInt($scope.roundsOb.rounds);
      if ((value === 'minus') && (NUM_ROUNDS >= 2)) {
        $scope.roundsOb.rounds = NUM_ROUNDS - 1;
      } else if (value === 'plus') {
        $scope.roundsOb.rounds = NUM_ROUNDS + 1;
      }
    }

    // User adjusted timeOn value
    $scope.changeTimeOn = function(value) {
      if (value === 'minus') {
        subtractTime($scope.optionOb.timeOn);
      } else if (value === 'plus') {
        addTime($scope.optionOb.timeOn);
      }
      $scope.optionJoinedOb.timeOnJoined = $scope.optionOb.timeOn.join('');
      var temp = $scope.optionOb.timeOn.slice();
      $scope.countOb.timeLeft = temp;
      $scope.countJoinedOb.timeLeftJoined = $scope.optionJoinedOb.timeOnJoined;
      $scope.$apply;
    }

    // User adjusted timeOff value
    $scope.changeTimeOff = function(value) {
      if (value === 'minus') {
        subtractTime($scope.optionOb.timeOff);
      } else if (value === 'plus') {
        addTime($scope.optionOb.timeOff);
      }
      $scope.optionJoinedOb.timeOffJoined = $scope.optionOb.timeOff.join('');
      var temp = $scope.optionOb.timeOff.slice();
      $scope.countOb.breakLeft = temp;
      $scope.countJoinedOb.breakLeftJoined = $scope.optionJoinedOb.timeOffJoined;
      $scope.$apply;
    }

    // Todo: Set up for minutes
    $scope.startClock = function() {
      $('#pause-button').removeClass('hidden');
      $('#start-button').addClass('hidden');
      if ($scope.roundsOb.roundsLeft <= $scope.roundsOb.rounds) {

        if ($('#time-left').hasClass('hidden')) {
          breakLeftInterval = setInterval(function() {
						isRunningOb.breakInterval = true;
            var MINUTES = parseInt($scope.countOb.breakLeft[0]);
            var SECONDS = parseInt($scope.countOb.breakLeft[2]);
            if (SECONDS != 00) {
              $scope.countOb.breakLeft[2] = minTwoDigits(SECONDS - 1);
              $scope.countJoinedOb.breakLeftJoined = $scope.countOb.breakLeft.join('');
              $scope.$apply();
              if ((SECONDS >= 02) && (SECONDS <= 04) && ($('#volume-switch').prop('checked'))) {
                var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
              } else if ((SECONDS == 01) && ($('#volume-switch').prop('checked'))){
                var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
              }
            } else if ((SECONDS == 00) && (MINUTES != 00)) {
              $scope.countOb.breakLeft[0] = minTwoDigits(MINUTES - 1);
              $scope.countOb.breakLeft[2] = '59';
              $scope.countJoinedOb.breakLeftJoined = $scope.countOb.breakLeft.join('');
              $scope.$apply();
            } else {
              $('#time-left').toggleClass('hidden');
              $('#break-left').toggleClass('hidden');
              $('#current-timer').css('background-color', '#a5d6a7');
              var tempArray = $scope.optionOb.timeOff.slice();
              $scope.countOb.breakLeft = tempArray;
              $scope.countJoinedOb.breakLeftJoined = $scope.optionJoinedOb.timeOffJoined;
              $scope.$apply;
              clearInterval(breakLeftInterval);
							isRunningOb.breakInterval = false;
              $scope.startClock();
            }

          }, 200);

        } else {
          timeLeftInterval = setInterval(function() {
						isRunningOb.timeInterval = true;
            var SECONDS = parseInt($scope.countOb.timeLeft[2]);
            var MINUTES = parseInt($scope.countOb.timeLeft[0]);
            if (SECONDS != 00) {
              $scope.countOb.timeLeft[2] = minTwoDigits(SECONDS - 1);
              $scope.countJoinedOb.timeLeftJoined = $scope.countOb.timeLeft.join('');
              $scope.$apply();
              if ((SECONDS >= 02) && (SECONDS <= 04) && ($('#volume-switch').prop('checked'))) {
                var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
              } else if ((SECONDS == 01) && ($('#volume-switch').prop('checked'))) {
                var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
              }
            } else if ((SECONDS == 00) && (MINUTES != 00)) {
              $scope.countOb.timeLeft[0] = minTwoDigits(MINUTES - 1);
              $scope.countOb.timeLeft[2] = '59';
              $scope.countJoinedOb.timeLeftJoined = $scope.countOb.timeLeft.join('');
              $scope.$apply();
            } else {

							$scope.roundsOb.roundsLeft = $scope.roundsOb.roundsLeft + 1;

              $('#break-left').toggleClass('hidden');
              $('#time-left').toggleClass('hidden');
              $('#current-timer').css('background-color', '#ef9a9a');
              var tempArray = $scope.optionOb.timeOn.slice();
              $scope.countOb.timeLeft = tempArray;
              $scope.countJoinedOb.timeLeftJoined = $scope.optionJoinedOb.timeOnJoined;
              $scope.$apply;
              clearInterval(timeLeftInterval);
							isRunningOb.timeInterval = false;
              // Reset break
              $scope.startClock();
            }
          }, 200);
        }

      } else {
					$scope.clear();
      }
    }
		
		// Clear correct interval
		function clearActiveInterval() {
			if (isRunningOb.timeInterval) {
				clearInterval(timeLeftInterval);
				isRunningOb.timeInterval = false;
			} else if (isRunningOb.breakInterval) {
				clearInterval(breakLeftInterval);
				isRunningOb.breakInterval = false;
			}
		}

    // Pause timer
    $scope.pauseClock = function() {
			clearActiveInterval()
      $('#pause-button').addClass('hidden');
      $('#start-button').removeClass('hidden');
    }

    $scope.clear = function() {
      var temp = $scope.optionOb.timeOff.slice();
      $scope.countOb.breakLeft = temp;
      $scope.countJoinedOb.breakLeftJoined = $scope.optionJoinedOb.timeOffJoined;

      $scope.roundsOb.roundsLeft = 1;

      var tempArray = $scope.optionOb.timeOn.slice();
      $scope.countOb.timeLeft = tempArray;
      $scope.countJoinedOb.timeLeftJoined = $scope.optionJoinedOb.timeOnJoined;
      $scope.$apply;
			
			$('#time-left').addClass('hidden');
      $('#break-left').removeClass('hidden');
			$('#current-timer').css('background-color', '#ef9a9a');
			$('#pause-button').addClass('hidden');
      $('#start-button').removeClass('hidden');
			clearActiveInterval();
    }

  }]) // End controller