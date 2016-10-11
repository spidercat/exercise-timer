// Add minute functionality
// Add sound
// Clean code

var app = angular.module("tabataApp", []);
app.controller("tabataAppCtrl", ["$scope", function ($scope) {
	
	// If running, mute option buttons?
	
	
		
		// Set default volume as on
	$("#volume-switch").prop("checked", true);
		
		// Rounds object
	$scope.rounds = {
		roundsLeft: 1,
		totalRounds: 8
	};
	
	$scope.optionTimes = {
		timeOff: "00:10",
		timeOn: "00:10"
	};
	
	$scope.timerTimes = {
		breakTime: "00:10",
		workTime: "00:10"
	};
	
	$scope.timerStates = {
		breakRunning: false,
		workRunning: false
	};
	
	
	
	// Parse time string int integers
	function parseTime(time) {
		var time = time.split(":");
		var SECONDS = parseInt(time[1]);
		var MINUTES = parseInt(time[0]);
		return [MINUTES, SECONDS];
	}
	
	// Put 0 if digit less than 10
	function minTwoDigits(n) {
		return (n < 10 ? "0" : "") + n;
	}
	

	// Adds or removes 1 second
	$scope.changeTime = function (currentTime, deltaTime) {
		var time = parseTime(currentTime);
		if (time[1] === 00 && deltaTime === "-1") {
			var newTime = (minTwoDigits(time[0]) + ":" + minTwoDigits(time[1])).toString();
			return newTime;
		}
		else {
			var tempTime = minTwoDigits(eval(time[1] + deltaTime));
			var newTime = (minTwoDigits(time[0]) + ":" + tempTime).toString();
	//		console.log(newTime);
			return newTime;
		}
		// if 60 or -1
	};
	
	/* Functions to change the option numbers
	================================================*/
	
	// Change the number of rounds
	$scope.changeRounds = function (currentRounds, deltaRounds) {
		if ($scope.rounds.totalRounds === 0 && deltaRounds === "-1") {
			return;
		}
		$scope.rounds.totalRounds = eval(currentRounds + deltaRounds);
	};
	
	// Could not find a way to pass property, so this is the hacky temporary solution
	$scope.changeTimeOff = function (currentTime, deltaTime) {
		var newTime = $scope.changeTime(currentTime, deltaTime);
		$scope.optionTimes.timeOff = newTime;
		$scope.timerTimes.breakTime = newTime;
	};
	
	$scope.changeTimeOn = function (currentTime, deltaTime) {
		var newTime = $scope.changeTime(currentTime, deltaTime);
		$scope.optionTimes.timeOn = newTime;
		$scope.timerTimes.workTime = newTime;
	};
	
	
	// Switch between break screen and work screen
	function switchScreens(value) {
		if (value === "toWork") {
			$("#time-left").removeClass("hidden");
			$("#break-left").addClass("hidden");
			$("#current-timer").css("background-color", "#a5d6a7");
			$scope.timerStates.workRunning = true;
		} 
		else {
			$("#break-left").removeClass("hidden");
			$("#time-left").addClass("hidden");
			$("#current-timer").css("background-color", "#ef9a9a");
			$scope.timerStates.breakRunning = true;
		}
		$scope.startClock();
	} // End switchScreens

	// Start the timer
	$scope.startClock = function () {
		$("#pause-button").removeClass("hidden");
		$("#start-button").addClass("hidden");
		// If there is a round left
		if ($scope.rounds.roundsLeft <= $scope.rounds.totalRounds) {

			if (!$scope.timerStates.workRunning) {
				breakInterval = setInterval(function () {
					$scope.timerStates.breakRunning = true;
					var newTime = $scope.changeTime($scope.timerTimes.breakTime, "-1");
					$scope.timerTimes.breakTime = newTime;
//					console.log(newTime);
						if (newTime === "00:00") {
							stopInterval();
							$scope.timerStates.breakRunning = false;
							var temp = $scope.optionTimes.timeOff;
							$scope.timerTimes.breakTime = temp;
							$scope.$apply();
							switchScreens("toWork");
						}
					$scope.$apply();
				}, 200);
			}
			
			else {
				workInterval = setInterval(function () {
					$scope.timerStates.workRunning = true;
					var newTime = $scope.changeTime($scope.timerTimes.workTime, "-1");
					$scope.timerTimes.workTime = newTime;
//					console.log(newTime);
					if (newTime === "00:00") {
						stopInterval();
						$scope.timerStates.workRunning = false;
						var temp = $scope.optionTimes.timeOn;
						$scope.timerTimes.workTime = temp;
						$scope.$apply();
						$scope.rounds.roundsLeft++;
						switchScreens("toBreak");
					}
					$scope.$apply();
				}, 200);
		
			}
		}
		else {
			$("#pause-button").addClass("hidden");
			$("#start-button").removeClass("hidden");
			$scope.clear();	
		}
	}; // End startClock()
	
	// Clear whichever interval is running
	function stopInterval() {
		if ($scope.timerStates.workRunning) {
			clearInterval(workInterval);
		} 
		else {
			clearInterval(breakInterval);
		}
	}
		
		
	$scope.pauseClock = function () {
		$("#pause-button").addClass("hidden");
		$("#start-button").removeClass("hidden");
		stopInterval();
	};
	
	$scope.clear = function () {
		$scope.timerTimes.breakTime = $scope.optionTimes.timeOff;
		$scope.timerTimes.workTime = $scope.optionTimes.timeOn;
		$scope.rounds.roundsLeft = 1;
		$scope.pauseClock();
	};
	
	
	
	
	

}]); // End controller