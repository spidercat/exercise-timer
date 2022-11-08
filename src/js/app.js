// to-do: Mute option buttons if interval running
// combine interval functions
// Add "only works with JavaScript"
// Make options text editable
// Goes to :01 not :00
// Code cleanup
// Styling is buggy on IE (weird, that never happens)

var app = angular.module("tabataApp", []);
app.controller("tabataAppCtrl", ["$scope", function ($scope) {
	
		// Set default volume as on
	$("#volume-switch").prop("checked", true);
	
	storedTotalRounds = localStorage.getItem("totalRounds")
	storedTimeOn = localStorage.getItem("timeOn")

	$scope.rounds = {
		roundsLeft: 1,
		totalRounds: storedTotalRounds ?? 8
	};
	
	$scope.optionTimes = {
		timeOn: storedTimeOn ?? "00:20"
	};
	
	$scope.timerTimes = {
		// workTime is counting down to 0 from timeOn.
		workTime: storedTimeOn ?? "00:20",
		// stopwatch is counting up from 0 to timeOn
		stopwatch: "00:00"
	};
	
	$scope.timerStates = {
		workRunning: false,
		stopwatch: []
	};
	
/* ===============================*/
	
	// Parse time string to integers
	function parseTime(time) {
		var time = time.split(":");
		var SECONDS = parseInt(time[1]);
		var MINUTES = parseInt(time[0]);
		return [MINUTES, SECONDS];
	}
	
	// Put 0 in front if digit less than 10
	function minTwoDigits(n) {
		return (n < 10 ? "0" : "") + n;
	}

	function makeSound(currentSeconds) {
		if (currentSeconds >= 2) {
			var beep = new buzz.sound("dist/buzz/beep-07.mp3").play();
		} else {
			var endBeep = new buzz.sound("dist/buzz/beep-08b.mp3").play();
		}
	}

	// Adds or removes 1 second
	$scope.changeTime = function (currentTime, deltaTime) {
		var time = parseTime(currentTime);
		var minutes = time[0];
		var seconds = time[1];
		var newTime = "";
		// If interval is running, make sound
		if (seconds <= 4 && minutes === 0 && $("#volume-switch").prop("checked") && ($scope.timerStates.breakRunning || $scope.timerStates.workRunning)) {
			makeSound(seconds);
		}
		if (seconds === 59 && deltaTime === "+1") {
			newTime = (minTwoDigits(minutes + 1) + ":" + "00").toString();
		} else if (minutes >= 1 && seconds === 0 && deltaTime === "-1") {
			newTime = (minTwoDigits(minutes - 1) + ":" + "59").toString();
		} else if (minutes === 0 && seconds === 0 && deltaTime === "-1") {
			newTime = (minTwoDigits(minutes) + ":" + minTwoDigits(seconds)).toString();
		} else {
			var tempTime = minTwoDigits(eval(seconds + deltaTime));
			newTime = (minTwoDigits(minutes) + ":" + tempTime).toString();
		}
		return newTime;
	};
	
	/* Functions to change the option numbers
	================================================*/
	
	// Change the number of rounds
	$scope.changeRounds = function (currentRounds, deltaRounds) {
		if ($scope.rounds.totalRounds === 0 && deltaRounds === "-1") {
			return;
		}
		$scope.rounds.totalRounds = eval(currentRounds + deltaRounds);
		localStorage.setItem("totalRounds", $scope.rounds.totalRounds);
	};
	
	$scope.changeTimeOn = function (currentTime, deltaTime) {
		var newTime = $scope.changeTime(currentTime, deltaTime);
		$scope.optionTimes.timeOn = newTime;
		$scope.timerTimes.workTime = newTime;
		localStorage.setItem("timeOn", newTime);
	};
		
	// Switch between break screen and work screen
	function switchScreens(value) {
		if (value === "toWork") {
			$("#time-left").removeClass("hidden");
			$("#break-left").addClass("hidden");
			$("#current-timer").css("background-color", "#a5d6a7");
			$scope.timerStates.workRunning = true;
		} else {
			$("#break-left").removeClass("hidden");
			$("#time-left").addClass("hidden");
			$("#current-timer").css("background-color", "#ef9a9a");
			$scope.timerStates.breakRunning = true;
		}
	} // End switchScreens
	
	// Start the timer
	$scope.startClock = function () {
		$("#pause-button").removeClass("hidden");
		$("#start-button").addClass("hidden");
		
		switchScreens("toWork")
		if ($scope.rounds.roundsLeft == $scope.rounds.totalRounds && 
			$scope.timerTimes.workTime === "00:00") {
			return
		}

		// If work is showing on click, change state
		if ($("#break-left").hasClass("hidden")) {
			$scope.timerStates.workRunning = true;	
		}
		
		workInterval = setInterval(function () {
			$scope.timerStates.workRunning = true;
			var newTime = $scope.changeTime($scope.timerTimes.workTime, "-1");
			var newStopwatch = $scope.changeTime($scope.timerTimes.stopwatch, "+1");
			$scope.timerTimes.workTime = newTime;
			$scope.timerTimes.stopwatch = newStopwatch
			if (newTime === "00:00") {
				if ($scope.rounds.roundsLeft == $scope.rounds.totalRounds) {
					clearInterval(workInterval)
					$scope.$apply();
					return
				}
				var temp = $scope.optionTimes.timeOn;
				$scope.timerTimes.workTime = temp;
				$scope.timerTimes.stopwatch = "00:00"
				$scope.$apply();
				$scope.rounds.roundsLeft++;
			}
			$scope.$apply();
		}, 1000);
	}; // End startClock()
	
	// Clear whichever interval is running
	function stopCurrentInterval() {
		clearInterval(workInterval);
	}
		
	$scope.pauseClock = function () {
		$("#pause-button").addClass("hidden");
		$("#start-button").removeClass("hidden");
		stopCurrentInterval();
		switchScreens("toBreak")
	};
	
	$scope.clear = function () {
		$scope.timerTimes.workTime = $scope.optionTimes.timeOn;
		$scope.timerTimes.stopwatch = "00:00"
		$scope.timerStates.stopwatch = []
		$scope.rounds.roundsLeft = 1;
		$("#break-left").removeClass("hidden");
		$("#time-left").addClass("hidden");
		$("#current-timer").css("background-color", "#ef9a9a");
		$scope.pauseClock();
	};

	$scope.sampleStopwatch = function () {
		$scope.timerStates.stopwatch[$scope.rounds.roundsLeft - 1] = $scope.timerTimes.stopwatch
		console.log("stopwatch", $scope.timerStates.stopwatch)
	}
																 
}]); // End controller