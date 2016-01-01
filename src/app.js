var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {

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

        if ($('#timeLeft').hasClass('hidden')) {
          breakLeftInterval = setInterval(function() {
            var minutes = parseInt($scope.breakLeft[0]);
            var seconds = parseInt($scope.breakLeft[2]);
            if (seconds != 00) {
              $scope.breakLeft[2] = minTwoDigits(seconds - 1);
              $scope.breakLeftJoined = $scope.breakLeft.join('');
              $scope.$apply();
              if ((seconds >= 02) && (seconds <= 04)) {
                var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
              } else if (seconds == 01) {
                var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
              }
            } else if ((seconds == 00) && (minutes != 00)) {
              $scope.breakLeft[0] = minTwoDigits(minutes - 1);
              $scope.breakLeft[2] = '59';
              $scope.breakLeftJoined = $scope.breakLeft.join('');
              $scope.$apply();
            } else {
              $('#timeLeft').toggleClass('hidden');
              $('#breakLeft').toggleClass('hidden');
              $('#time-left').css('background-color', '#a5d6a7');
              var tempArray = $scope.timeOff.slice();
              $scope.breakLeft = tempArray;
              $scope.breakLeftJoined = $scope.timeOffJoined;
              $scope.$apply;
              clearInterval(breakLeftInterval);
              $scope.startClock();
            }

          }, 1000);

        } else {
          timeLeftInterval = setInterval(function() {
            var seconds = parseInt($scope.timeLeft[2]);
            var minutes = parseInt($scope.timeLeft[0]);
            if (seconds != 00) {
              $scope.timeLeft[2] = minTwoDigits(seconds - 1);
              $scope.timeLeftJoined = $scope.timeLeft.join('');
              $scope.$apply();
              if ((seconds >= 02) && (seconds <= 04)) {
                var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
              } else if (seconds == 01) {
                var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
              }
            } else if ((seconds == 00) && (minutes != 00)) {
              $scope.timeLeft[0] = minTwoDigits(minutes - 1);
              $scope.timeLeft[2] = '59';
              $scope.timeLeftJoined = $scope.timeLeft.join('');
              $scope.$apply();
            } else {
              $scope.roundsLeft = $scope.roundsLeft + 1;
              $('#breakLeft').toggleClass('hidden');
              $('#timeLeft').toggleClass('hidden');
              $('#time-left').css('background-color', '#ef9a9a');
              // To hold copied array. Because apparently, assigning an array as a value
              // creates a pointer. What the hell, JavaScript? Yes, this took me a day to solve.
              var tempArray = $scope.timeOn.slice();
              $scope.timeLeft = tempArray;
              $scope.timeLeftJoined = $scope.timeOnJoined;
              $scope.$apply;
              clearInterval(timeLeftInterval);
              // Reset break
              $scope.startClock();
            }
          }, 1000);
        }

      } else {
        $('#pause-button').addClass('hidden');
        $('#start-button').removeClass('hidden');
      }
    }

    // Pause timer
    $scope.pauseClock = function() {
      clearInterval(breakLeftInterval);
      clearInterval(timeLeftInterval);
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

      clearInterval(breakLeftInterval);
      clearInterval(timeLeftInterval);

      $('#pause-button').addClass('hidden');
      $('#start-button').removeClass('hidden');

    }

  }]) // End controller