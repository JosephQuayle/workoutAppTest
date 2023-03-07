angular.module("workoutApp").controller("workoutController", function ($scope) {
  $scope.isHome = true;

  $scope.homePage = function () {
    $scope.isHome = true;
    $scope.isWorkoutSaved = false;
    $scope.isWorkoutLogged = false;
    $scope.isWorkoutHomePage = false;
    $scope.isCreatingWorkout = false;
    $scope.isOwnWorkouts = false;
    $scope.isLoggingWorkout = false;
    $scope.isWorkoutHistory = false;
    $scope.isPremadeWorkoutPage = false;
    $scope.isSizeStrength = false;
    $scope.isSize = false;
    $scope.isStrength = false;
    $scope.isCalisthenics = false;
    $scope.isFormPage = false;
    $scope.isLoggingUpperHeavy = false;
    $scope.isLoggingLowerLight = false;
    $scope.isLoggingUpperLight = false;
    $scope.isLoggingLowerHeavy = false;
    $scope.isLoggingArmsShoulder1 = false;
    $scope.isLoggingArmsShoulder2 = false;
    $scope.isLoggingChestBack1 = false;
    $scope.isLoggingChestBack2 = false;
    $scope.isLoggingLegs1 = false;
    $scope.isLoggingLegs2 = false;
    $scope.isLoggingSquat = false;
    $scope.isLoggingBench = false;
    $scope.isLoggingDeadlift = false;
    $scope.isLoggingCalUpper1 = false;
    $scope.isLoggingCalLower = false;
    $scope.isLoggingCalUpper2 = false;
    $scope.isCalorieHomePage = false;
    $scope.isTrackingCalories = false;
    $scope.isCalorieHistory = false;
    $scope.isSavedCals = false;
    $scope.isSettings = false;
    location.reload();
  };

  $scope.workoutHomePage = function () {
    $scope.isHome = false;
    $scope.isWorkoutHomePage = true;
    $scope.isCreatingWorkout = false;
    $scope.isOwnWorkouts = false;
    $scope.isLoggingWorkout = false;
    $scope.isPremadeWorkoutPage = false;

    console.log("Workout Home Page!");
  };

  $scope.createWorkoutPage = function () {
    $scope.isWorkoutHomePage = false;
    $scope.isCreatingWorkout = true;
  };

  let counter = 0;

  $scope.addExercise = function () {
    counter++;
    // let exerciseList = document.querySelector("#exerciseList");
    // let clone = exerciseList.cloneNode(true);
    // let addButton = document.querySelector("#addbtn");
    // clone.id = "exerciseList" + counter;
    // clone.classList.add("exercise-list");
    // addButton.before(clone);

    let exerciseInput = document.querySelector("#exerciseInput");
    let clone = exerciseInput.cloneNode(true);
    let addButton = document.querySelector("#addbtn");
    clone.id = "exerciseInput" + counter;
    clone.classList.add("exercise-input");
    addButton.before(clone);
  };

  //for saving exercises to the specific workout, the workoutname is the KEY when saving to local storage, and the exercises are the values. or, create array with the workout name as the array name, and then all the values being the exercises?

  $scope.saveWorkout = function () {
    //get values from the cloned inputs

    let workout = [];
    let workoutName = document.getElementById("workoutName").value;
    let userInputs = document.getElementsByClassName("exercise-input");
    for (let index = 0; index < userInputs.length; index++) {
      console.log(userInputs[index].value);
      workout.push(userInputs[index].value);
    }
    let workoutKey = workoutName;
    let workoutObj = {
      [workoutKey]: workout,
    };

    //if item doesnt exist already
    if (window.localStorage.getItem(workoutKey) == null) {
      //save to local storage
      window.localStorage.setItem(workoutKey, JSON.stringify(workoutObj));
      //window.localStorage.setItem(workoutKey, workout);
      $scope.isWorkoutSaved = true;
      $scope.isCreatingWorkout = false;
    } else {
      alert("Workout Name Already Taken! Try Again");
      $scope.isCreatingWorkout = true;
    }

    //console.log(workoutObj);
    //console.log(workoutKey);
    // console.log(workoutName, workout);
    // document.getElementById("workoutName").value = "";
  };

  //$scope.workoutLogging = workoutLoggingPage();

  $scope.ownWorkoutPage = function () {
    $scope.isWorkoutHomePage = false;
    $scope.isWorkoutSaved = false;
    $scope.isOwnWorkouts = true;
    let increment = 0;

    //after creating the logs, the log objects would appear in Own Workouts, so i had to filter the objects so that it doesnt find any objects with the word "Log" in the key so that the logs wouldnt be displayed here.
    for (const [key] of Object.entries(localStorage).filter(
      ([key, value]) =>
        !key.includes("Log") && !key.includes("total") && !key.includes("items")
    )) {
      increment++;
      console.log(`${key}`);
      // console.log(`${value}`);
      let keyy = `${key}`;
      let theDiv = document.getElementById("ownWorkoutBtns");
      let span = document.createElement("span");
      span.innerHTML = `<button id=${keyy} class="own-workout-btn span-btn" onclick="angular.element(this).scope().workoutLogging(${keyy})">${keyy}</button>`;

      theDiv.appendChild(span);
    }
  };

  $scope.workoutLogging = function (theKey) {
    $scope.isOwnWorkouts = false;
    $scope.isLoggingWorkout = true;

    //get exercises where id = localstorage keyy

    //returned the button of the workout
    let lstorageKey = theKey;
    //console.log(lstorageKey);

    //id of the button is the name of the workout. so, get the name of the workout.
    let workoutName = lstorageKey.id;
    console.log(workoutName);

    //get the workout where it is equal to the button pressed.
    let wrkItem = JSON.parse(localStorage.getItem(workoutName));

    // console.log(wrkItem[workoutName][0]);
    // console.log(wrkItem[workoutName][1]);
    // console.log(wrkItem[workoutName][2]);
    // console.log(wrkItem[workoutName][3]);
    // console.log(wrkItem[workoutName].length);

    let id = -1;
    let exercise = "";
    for (let index = 0; index < wrkItem[workoutName].length; index++) {
      id == id++;

      //sets page title to the workout name
      let pageHeader = document.getElementById("workoutNameHeading");
      pageHeader.innerHTML = workoutName;

      //gets each exercise in the workout
      exercise = wrkItem[workoutName][index];
      console.log(exercise);

      let exerciseLogging = document.getElementById("exerciseLogging");
      let logExercise = document.createElement("div");
      logExercise.classList.add("log-exercise");
      logExercise.id = id;
      let repSetWeight = document.createElement("div");
      repSetWeight.classList.add("rep-set-weight");
      logExercise.appendChild(repSetWeight);
      let noteDiv = document.createElement("div");
      noteDiv.classList.add("note-div");
      logExercise.appendChild(noteDiv);
      let timerDiv = document.createElement("div");
      timerDiv.classList.add("time-inputs");
      logExercise.appendChild(timerDiv);
      let timerbuttons = document.createElement("div");
      timerbuttons.classList.add("time-buttons");
      logExercise.appendChild(timerbuttons);
      let hoursInput = document.createElement("input");
      hoursInput.classList.add("hms-inputs");
      hoursInput.id = "hours" + id;
      hoursInput.placeholder = "Hours";
      hoursInput.type = "number";
      hoursInput.innerHTML = "";
      hoursInput.value = "00";
      hoursInput.readOnly = true;
      timerDiv.appendChild(hoursInput);
      let minutesInput = document.createElement("input");
      minutesInput.classList.add("hms-inputs");
      minutesInput.id = "minutes" + id;
      minutesInput.placeholder = "Minutes";
      minutesInput.type = "number";
      minutesInput.innerHTML = "";
      minutesInput.value = "00";
      minutesInput.readOnly = true;
      minutesInput.max = "59";
      timerDiv.appendChild(minutesInput);
      let secondsInput = document.createElement("input");
      secondsInput.classList.add("hms-inputs");
      secondsInput.id = "seconds" + id;
      secondsInput.placeholder = "Seconds";
      secondsInput.type = "number";
      secondsInput.innerHTML = "";
      secondsInput.value = "00";
      secondsInput.readOnly = true;
      secondsInput.max = "59";
      timerDiv.appendChild(secondsInput);
      let millisecondsInput = document.createElement("input");
      millisecondsInput.classList.add("hms-inputs");
      millisecondsInput.id = "milliseconds" + id;
      millisecondsInput.placeholder = "Milliseconds";
      millisecondsInput.type = "number";
      millisecondsInput.innerHTML = "";
      millisecondsInput.value = "00";
      millisecondsInput.readOnly = true;
      millisecondsInput.max = "999";
      timerDiv.appendChild(millisecondsInput);
      let timerBtn = document.createElement("span");
      timerBtn.innerHTML = `<button id="timerBtn" class="timer-btn" onclick="angular.element(this).scope().startTimer('${id}')"><i class="fas fa-play"></i></button>`;
      timerbuttons.appendChild(timerBtn);
      let stopTimerBtn = document.createElement("span");
      stopTimerBtn.innerHTML = `<button id="stopTimerBtn" class="timer-btn" onclick="angular.element(this).scope().pauseTimer('${id}')"><i class="fas fa-pause"></i></button>`;
      timerbuttons.appendChild(stopTimerBtn);
      let resetTimerBtn = document.createElement("span");
      resetTimerBtn.innerHTML = `<button id="resetTimerBtn" class="timer-btn" onclick="angular.element(this).scope().resetTimer('${id}')"><i class="fas fa-stop"></i></button>`;
      timerbuttons.appendChild(resetTimerBtn);
      let exNameDiv = document.createElement("div");
      exNameDiv.classList.add("ex-name-div");
      repSetWeight.appendChild(exNameDiv);
      let exName = document.createElement("p");
      exName.innerHTML = exercise;
      exName.id = "exName" + id;
      exNameDiv.appendChild(exName);
      let inputsDiv = document.createElement("div");
      inputsDiv.classList.add("rsw-inputs-div");
      repSetWeight.appendChild(inputsDiv);
      let setsInput = document.createElement("input");
      setsInput.classList.add("rsw-inputs");
      setsInput.id = "sets" + id;
      setsInput.placeholder = "Sets";
      setsInput.type = "number";
      setsInput.innerHTML = "";
      setsInput.value = "";
      inputsDiv.appendChild(setsInput);
      let repsInput = document.createElement("input");
      repsInput.classList.add("rsw-inputs");
      repsInput.id = "reps" + id;
      repsInput.placeholder = "Reps";
      repsInput.type = "number";
      repsInput.innerHTML = "";
      repsInput.value = "";
      inputsDiv.appendChild(repsInput);
      let weightInput = document.createElement("input");
      weightInput.classList.add("rsw-inputs");
      weightInput.id = "weight" + id;
      weightInput.placeholder = "Weight/Time";
      weightInput.type = "text";
      weightInput.innerHTML = "";
      weightInput.value = "";
      inputsDiv.appendChild(weightInput);

      // let setsAccomplished = document.createElement("div");
      // setsAccomplished.classList.add("sets-accomplished");
      // logExercise.appendChild(setsAccomplished);
      // let accompText = document.createElement("p");
      // accompText.classList.add("accomp-text");
      // accompText.innerHTML = "Accomplished All Reps?";
      // setsAccomplished.appendChild(accompText);
      let notesInput = document.createElement("input");
      notesInput.classList.add("note-inputs");
      notesInput.id = "note" + id;
      notesInput.placeholder = "Notes...";
      notesInput.type = "text";
      notesInput.innerHTML = "";
      notesInput.value = "";
      noteDiv.appendChild(notesInput);

      exerciseLogging.appendChild(logExercise);
    }
    //console.log(Object.values(workoutName).length);

    let workoutButtonDiv = document.getElementById("logWorkoutButtonDiv");
    let span1 = document.createElement("span");
    span1.innerHTML = `<button id="logTheWorkout" class="log-workout-btn" onclick="angular.element(this).scope().logWorkout()">Log Workout</button>`;
    workoutButtonDiv.appendChild(span1);

    //Fixes the problem
    $scope.$apply();
  };

  $scope.timers = {};

  $scope.startTimer = function (id) {
    let hours = document.getElementById(`hours${id}`);
    let minutes = document.getElementById(`minutes${id}`);
    let seconds = document.getElementById(`seconds${id}`);
    let milliseconds = document.getElementById(`milliseconds${id}`);
    console.log(hours);
    let h = hours.value;
    let m = minutes.value;
    let s = seconds.value;
    let ms = milliseconds.value;

    // Reset timer to 0
    clearInterval($scope.timers[id]);
    $scope.timers[id] = setInterval(function () {
      ms += 10;
      if (ms >= 1000) {
        ms = 0;
        s++;
        if (s >= 60) {
          s = 0;
          m++;
          if (m == 60) {
            m = 0;
            h++;
          }
        }
      }

      // Update input values
      hours.value = h.toString().padStart(2, "0");
      minutes.value = m.toString().padStart(2, "0");
      seconds.value = Number(s).toFixed(0).padStart(2, "0");
      milliseconds.value = ms.toString().padStart(3, "0").slice(0, -1);
    }, 10);
  };

  $scope.pauseTimer = function (id) {
    // Stop timer
    clearInterval($scope.timers[id]);
  };

  $scope.resetTimer = function (id) {
    let hours = document.getElementById(`hours${id}`);
    let minutes = document.getElementById(`minutes${id}`);
    let seconds = document.getElementById(`seconds${id}`);
    let milliseconds = document.getElementById(`milliseconds${id}`);

    // Stop timer
    clearInterval($scope.timers[id]);

    // Reset input values to 0
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
    milliseconds.value = "00";
  };

  $scope.logWorkout = function () {
    $scope.isLoggingWorkout = false;
    $scope.isWorkoutLogged = true;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".log-exercise");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("workoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`exName${i}`);
      console.log(exName.innerHTML);
      let sets = document.getElementById(`sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.innerHTML);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
    $scope.$apply();
  };

  $scope.logUpperHeavyWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingUpperHeavy = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".uphv-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("uphvWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`uphvExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`uphvSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`uphvReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`uphvWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`uphvNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logLowerLightWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingLowerLight = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".lwli-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("lwliWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`lwliExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`lwliSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`lwliReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`lwliWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`lwliNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logUpperLightWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingUpperLight = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".upli-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("upliWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`upliExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`upliSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`upliReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`upliWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`upliNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logLowerHeavyWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingLowerHeavy = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".lwhv-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("lwhvWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`lwhvExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`lwhvSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`lwhvReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`lwhvWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`lwhvNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logArmsShoulders1Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingArmsShoulder1 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".arsh1-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("arsh1WorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`arsh1ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`arsh1Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`arsh1Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`arsh1Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`arsh1Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logArmsShoulders2Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingArmsShoulder2 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".arsh2-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("arsh2WorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`arsh2ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`arsh2Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`arsh2Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`arsh2Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`arsh2Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logChestBack1Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingChestBack1 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".chbk1-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("chbk1WorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`chbk1ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`chbk1Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`chbk1Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`chbk1Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`chbk1Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logChestBack2Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingChestBack2 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".chbk2-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("chbk2WorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`chbk2ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`chbk2Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`chbk2Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`chbk2Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`chbk2Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logLegs1Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingLegs1 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".legs1-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("legs1WorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`legs1ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`legs1Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`legs1Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`legs1Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`legs1Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logLegs2Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingLegs2 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".legs2-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("legs2WorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`legs2ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`legs2Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`legs2Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`legs2Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`legs2Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logSquatWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingSquat = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".squat-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("squatWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`squatExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`squatSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`squatReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`squatWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`squatNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logBenchWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingBench = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".bench-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("benchWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`benchExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`benchSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`benchReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`benchWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`benchNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logDeadliftWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingDeadlift = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".deadlift-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById(
      "deadliftWorkoutNameHeading"
    ).innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`deadliftExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`deadliftSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`deadliftReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`deadliftWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`deadliftNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logCalUpr1Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingCalUpper1 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".calupr1-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById(
      "calupr1WorkoutNameHeading"
    ).innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`calupr1ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`calupr1Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`calupr1Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`calupr1Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`calupr1Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logCalLowerWorkout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingCalLower = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".callwr-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById("callwrWorkoutNameHeading").innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`callwrExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`callwrSets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`callwrReps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`callwrWeight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`callwrNote${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.logCalUpr2Workout = function () {
    $scope.isWorkoutLogged = true;
    $scope.isLoggingCalUpper2 = false;

    //gets amount of log-exercise divs, allowing me to loop through each exercise in the workout, to get the reps, sets, weight, and notes.
    let divs = document.querySelectorAll(".calupr2-exercise-div");
    let divAmount = divs.length;
    console.log(divAmount);

    //sets the keyname and gets the current date
    let keyName = document.getElementById(
      "calupr2WorkoutNameHeading"
    ).innerHTML;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    //sets the keyname to name of the workout + the word Log and the current date, so that the logs will always be unique unless the user logs the same workout multiple times in the same day, in this case the log of that date would just be updated to the new values.
    //also sets all the object values to arrays where i can store the values of each exercises reps, sets, weight, and notes.
    let logName = keyName + " Log " + currentDate;
    let exerciseArr = [];
    let setsArr = [];
    let repsArr = [];
    let weightArr = [];
    let noteArr = [];
    let loggedWorkoutObj = {
      Workout: keyName,
      Exercise: exerciseArr,
      Sets: setsArr,
      Reps: repsArr,
      Weight: weightArr,
      Note: noteArr,
    };

    for (let i = 0; i < divAmount; i++) {
      let exName = document.getElementById(`calupr2ExName${i}`);
      console.log(exName.value);
      let sets = document.getElementById(`calupr2Sets${i}`);
      console.log(sets.value);
      let reps = document.getElementById(`calupr2Reps${i}`);
      console.log(reps.value);
      let weight = document.getElementById(`calupr2Weight${i}`);
      console.log(weight.value);
      let note = document.getElementById(`calupr2Note${i}`);
      console.log(note.value);

      //pushes each value for each exercise within the workout to the correct array in the object.
      exerciseArr.push(exName.value);
      setsArr.push(sets.value);
      repsArr.push(reps.value);
      weightArr.push(weight.value);
      noteArr.push(note.value);
    }
    //sets the log object to localstorage, with the log name as the key.
    window.localStorage.setItem(logName, JSON.stringify(loggedWorkoutObj));
  };

  $scope.workoutHistoryPage = function () {
    $scope.isHome = false;
    $scope.isWorkoutHomePage = false;
    $scope.isWorkoutLogged = false;
    $scope.isWorkoutHistory = true;
    let counter = 0;

    const logKeys = Object.keys(localStorage).filter((key) =>
      key.includes("Log")
    );
    logKeys.forEach((key) => {
      counter++;
      const logDiv = document.createElement("div");
      logDiv.classList.add("log-container");
      logDiv.id = counter;
      const logName = document.createElement("p");
      logName.id = counter;
      logName.classList.add("log-name");
      logDiv.appendChild(logName);

      const logItem = JSON.parse(localStorage.getItem(key));
      console.log(key);
      logName.innerHTML = key;
      const exercise = logItem.Exercise;
      const sets = logItem.Sets;
      const reps = logItem.Reps;
      const weight = logItem.Weight;
      const notes = logItem.Note;
      for (let i = 0; i < exercise.length; i++) {
        //console.log(key);
        const exerciseDiv = document.createElement("div");
        exerciseDiv.id = i;
        exerciseDiv.classList.add("exercises-div");
        logDiv.appendChild(exerciseDiv);
        const logExercises = document.createElement("p");
        logExercises.id = i;
        logExercises.classList.add("exercises");
        logExercises.innerHTML = exercise[i];
        exerciseDiv.appendChild(logExercises);
        //console.log(exercise[i]);
        const setDiv = document.createElement("div");
        setDiv.classList.add("set-container");
        setDiv.id = i;
        exerciseDiv.appendChild(setDiv);
        const setHeading = document.createElement("p");
        setHeading.id = i;
        setHeading.classList.add("set-heading");
        setHeading.innerHTML = "Sets: ";
        setDiv.appendChild(setHeading);
        const logSets = document.createElement("p");
        logSets.id = i;
        logSets.classList.add("sets");
        logSets.innerHTML = sets[i];
        setDiv.appendChild(logSets);
        //console.log(sets[i]);
        const repDiv = document.createElement("div");
        repDiv.classList.add("rep-container");
        repDiv.id = i;
        exerciseDiv.appendChild(repDiv);
        const repHeading = document.createElement("p");
        repHeading.id = i;
        repHeading.classList.add("rep-heading");
        repHeading.innerHTML = "Reps: ";
        repDiv.appendChild(repHeading);
        const logReps = document.createElement("p");
        logReps.id = i;
        logReps.classList.add("reps");
        logReps.innerHTML = reps[i];
        repDiv.appendChild(logReps);
        //console.log(reps[i]);
        const weightDiv = document.createElement("div");
        weightDiv.classList.add("weight-container");
        weightDiv.id = i;
        exerciseDiv.appendChild(weightDiv);
        const weightHeading = document.createElement("p");
        weightHeading.id = i;
        weightHeading.classList.add("weight-heading");
        weightHeading.innerHTML = "Weight/Time: ";
        weightDiv.appendChild(weightHeading);
        const logWeight = document.createElement("p");
        logWeight.id = i;
        logWeight.classList.add("weight");
        logWeight.innerHTML = weight[i];
        weightDiv.appendChild(logWeight);
        //console.log(weight[i]);
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-container");
        noteDiv.id = i;
        exerciseDiv.appendChild(noteDiv);
        const noteHeading = document.createElement("p");
        noteHeading.id = i;
        noteHeading.classList.add("note-heading");
        noteHeading.innerHTML = "Note: ";
        noteDiv.appendChild(noteHeading);
        const logNotes = document.createElement("p");
        logNotes.id = i;
        logNotes.classList.add("notes");
        logNotes.innerHTML = notes[i];
        noteDiv.appendChild(logNotes);
        console.log(notes[i]);
      }
      const workoutLogs = document.getElementById("workoutLogs");
      workoutLogs.appendChild(logDiv);
    });
  };

  $scope.premadeWorkoutsPage = function () {
    $scope.isWorkoutHomePage = false;
    $scope.isPremadeWorkoutPage = true;
    $scope.isSizeStrength = false;
    $scope.isSize = false;
    $scope.isStrength = false;
    $scope.isCalisthenics = false;
  };

  $scope.sizeStrength = function () {
    $scope.isPremadeWorkoutPage = false;
    $scope.isSizeStrength = true;
    $scope.isLoggingUpperHeavy = false;
    $scope.isLoggingLowerHeavy = false;
    $scope.isLoggingUpperLight = false;
    $scope.isLoggingLowerLight = false;
  };

  $scope.size = function () {
    $scope.isPremadeWorkoutPage = false;
    $scope.isSize = true;
    $scope.isLoggingArmsShoulder1 = false;
    $scope.isLoggingArmsShoulder2 = false;
    $scope.isLoggingChestBack1 = false;
    $scope.isLoggingChestBack2 = false;
    $scope.isLoggingLegs1 = false;
    $scope.isLoggingLegs2 = false;
  };

  $scope.strength = function () {
    $scope.isPremadeWorkoutPage = false;
    $scope.isStrength = true;
    $scope.isLoggingSquat = false;
    $scope.isLoggingBench = false;
    $scope.isLoggingDeadlift = false;
  };

  $scope.calisthenics = function () {
    $scope.isPremadeWorkoutPage = false;
    $scope.isCalisthenics = true;
    $scope.isLoggingCalUpper1 = false;
    $scope.isLoggingCalLower = false;
    $scope.isLoggingCalUpper2 = false;
  };

  $scope.formHomePage = function () {
    $scope.isHome = false;
    $scope.isFormPage = true;
  };

  $scope.loggingUpperHeavy = function () {
    $scope.isSizeStrength = false;
    $scope.isLoggingUpperHeavy = true;
  };
  $scope.loggingLowerLight = function () {
    $scope.isSizeStrength = false;
    $scope.isLoggingLowerLight = true;
  };
  $scope.loggingUpperLight = function () {
    $scope.isSizeStrength = false;
    $scope.isLoggingUpperLight = true;
  };
  $scope.loggingLowerHeavy = function () {
    $scope.isSizeStrength = false;
    $scope.isLoggingLowerHeavy = true;
  };
  $scope.loggingArmsShoulder1 = function () {
    $scope.isSize = false;
    $scope.isLoggingArmsShoulder1 = true;
  };
  $scope.loggingArmsShoulder2 = function () {
    $scope.isSize = false;
    $scope.isLoggingArmsShoulder2 = true;
  };
  $scope.loggingChestBack1 = function () {
    $scope.isSize = false;
    $scope.isLoggingChestBack1 = true;
  };
  $scope.loggingChestBack2 = function () {
    $scope.isSize = false;
    $scope.isLoggingChestBack2 = true;
  };
  $scope.loggingLegs1 = function () {
    $scope.isSize = false;
    $scope.isLoggingLegs1 = true;
  };
  $scope.loggingLegs2 = function () {
    $scope.isSize = false;
    $scope.isLoggingLegs2 = true;
  };
  $scope.loggingSquat = function () {
    $scope.isStrength = false;
    $scope.isLoggingSquat = true;
  };
  $scope.loggingBench = function () {
    $scope.isStrength = false;
    $scope.isLoggingBench = true;
  };
  $scope.loggingDeadlift = function () {
    $scope.isStrength = false;
    $scope.isLoggingDeadlift = true;
  };

  $scope.loggingCalUpper1 = function () {
    $scope.isCalisthenics = false;
    $scope.isLoggingCalUpper1 = true;
  };
  $scope.loggingCalLower = function () {
    $scope.isCalisthenics = false;
    $scope.isLoggingCalLower = true;
  };
  $scope.loggingCalUpper2 = function () {
    $scope.isCalisthenics = false;
    $scope.isLoggingCalUpper2 = true;
  };

  $scope.filterForm = function () {
    // Declare variables
    let formDivs = document.querySelectorAll(".exercise-form-div");
    let searchQ = document.getElementById("searchForm").value;
    // Loop through all exercise items
    for (i = 0; i < formDivs.length; i++) {
      // If the text is within the card...
      if (
        formDivs[i].innerText
          .toLowerCase()
          // ...and the text matches the search query...
          .includes(searchQ.toLowerCase())
      ) {
        // ...remove the `.is-hidden` class.
        formDivs[i].classList.remove("is-hidden");
      } else {
        // Otherwise, add the class.
        formDivs[i].classList.add("is-hidden");
      }
    }
  };

  $scope.calorieHomePage = function () {
    $scope.isHome = false;
    $scope.isCalorieHomePage = true;
    $scope.isTrackingCalories = false;
  };

  $scope.trackCaloriesPage = function () {
    $scope.isCalorieHomePage = false;
    $scope.isTrackingCalories = true;
  };

  $scope.calorieHistoryPage = function () {
    $scope.isCalorieHomePage = false;
    $scope.isCalorieHistory = true;
  };

  $scope.addCalorieItem = function () {
    let foodItem = document.getElementById("foodName");
    let calAmount = document.getElementById("calorieAmount");
    console.log(foodItem.value, calAmount.value);
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("tracked-items");

    let itemName = document.createElement("p");
    itemName.classList.add("tracker-name");
    itemName.innerHTML = foodItem.value;
    itemContainer.appendChild(itemName);
    let itemCal = document.createElement("p");
    itemCal.classList.add("tracker-cal");
    itemCal.innerHTML = calAmount.value;
    itemContainer.appendChild(itemCal);

    let trackerDiv = document.getElementById("tracker");
    trackerDiv.appendChild(itemContainer);
    //trackerDiv.appendChild(itemName);
    //trackerDiv.appendChild(itemCal);

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push({ itemName: foodItem.value, itemCal: calAmount.value });
    localStorage.setItem("items", JSON.stringify(items));
    let totalCalories = 0;
    for (let i = 0; i < items.length; i++) {
      totalCalories += parseInt(items[i].itemCal);
    }
    localStorage.setItem("totalCalories", totalCalories);
    let totalCalsElement = document.getElementById("totalCals");
    totalCalsElement.innerHTML = totalCalories;
    foodItem.value = "";
    calAmount.value = "";
  };

  $scope.loadSavedItems = function () {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    for (let i = 0; i < items.length; i++) {
      let itemContainer = document.createElement("div");
      itemContainer.classList.add("tracked-items");
      let itemName = document.createElement("p");
      itemName.classList.add("tracker-name");
      itemName.innerHTML = items[i].itemName;
      itemContainer.appendChild(itemName);
      let itemCal = document.createElement("p");
      itemCal.classList.add("tracker-cal");
      itemCal.innerHTML = items[i].itemCal;
      itemContainer.appendChild(itemCal);
      let trackerDiv = document.getElementById("tracker");
      trackerDiv.appendChild(itemContainer);
    }
    let totalCalories = parseInt(localStorage.getItem("totalCalories")) || 0;
    let totalCalsElement = document.getElementById("totalCals");
    totalCalsElement.innerHTML = totalCalories;
  };

  $scope.saveCalsForDay = function () {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);

    let totalCals = document.getElementById("totalCals").textContent;
    localStorage.setItem("totalCaloriesDay " + currentDate, totalCals);
    localStorage.removeItem("totalCalories");
    localStorage.removeItem("items");
    $scope.isTrackingCalories = false;
    $scope.isSavedCals = true;
  };

  $scope.calorieHistoryPage = function () {
    $scope.isSavedCals = false;
    $scope.isCalorieHomePage = false;
    $scope.isCalorieHistory = true;

    const logKeys = Object.keys(localStorage).filter((key) =>
      key.includes("CaloriesDay")
    );
    let counter = 1;
    logKeys.forEach((key) => {
      counter++;
      let calorieLogsDiv = document.getElementById("dateValCal");
      let calLog = document.createElement("p");
      calLog.classList.add("calorie-log");
      let calValue = document.createElement("p");
      calValue.classList.add("calorie-value");
      const logCalItem = JSON.parse(localStorage.getItem(key));
      console.log(key);
      let date = key.split(" ")[1];
      calLog.innerHTML = date;
      calValue.innerHTML = logCalItem;
      calorieLogsDiv.appendChild(calLog);
      calorieLogsDiv.appendChild(calValue);
    });
  };

  $scope.settings = function () {
    $scope.isHome = false;
    $scope.isSettings = true;
  };

  $scope.deleteOwnWorkouts = function () {
    for (const key in localStorage) {
      if (
        !key.includes("Log") &&
        !key.includes("totalCalories") &&
        !key.includes("totalCaloriesDay") &&
        !key.includes("items")
      ) {
        localStorage.removeItem(key);
      }
    }
  };

  $scope.deleteWorkoutLogs = function () {
    for (const key in localStorage) {
      if (key.includes("Log")) {
        localStorage.removeItem(key);
      }
    }
  };

  $scope.deleteCalorieLogs = function () {
    for (const key in localStorage) {
      if (
        key.includes("totalCalories") ||
        key.includes("Calories") ||
        key.includes("items")
      ) {
        localStorage.removeItem(key);
      }
    }
  };
});
