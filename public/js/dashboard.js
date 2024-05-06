  // check string helper
  function isValidString(str, varName) {
    if (!str) {
      throw `Error: ${varName} must be provided`;
    }
    if (typeof str !== "string") {
      throw `Error: ${varName} must be a string`;
    }

    str = str.trim();
    if (str.length === 0) {
      throw `Error: ${varName} must not be empty`;
    }
    if (!isNaN(str)) {
      throw `Error: ${varName} must not only contain numbers`;
    }

    return str;
  }

  // check Intiger helper
  function isValidInt(int, varName) {
    if (!int) {
      throw `Error: ${varName} must be provided`;
    }
    if (isNaN(int)) {
      throw `Error: ${varName} must be a number`;
    }
    // none of our numbers should be negative
    if (int < 0) {
      throw `Error: ${varName} must be greater than 0`;
    }
    return Number(int);
  }

let workoutTypes = {"Running": ["kilometers", "meters"], "Yoga": ["calories"], "Gym": ["calories"], "Biking": ["kilometers", "meters"], "Tennis": ["calories"], "Swimming": ["meters"]};
let workoutbutton = document.getElementById("addWorkout");
let modalType = document.getElementById("addWorkoutModalType");
let modal = document.getElementById("addWorkoutModal");
let findWorkout = document.getElementById("findWorkout");
let submitWorkout = document.getElementById("submitWorkout");
let close = document.getElementById("close");
let close1 = document.getElementById("close1");
workoutbutton.addEventListener("click", async (event) => {
    modalType.style.display = "block";

});

close.addEventListener("click", async (event) => {
    modalType.style.display = "none";
});

findWorkout.addEventListener("click", async (event) => {
    event.preventDefault();
    modalType.style.display = "none";
    let workoutType = document.getElementById("workoutType").value;
    let workoutForm = document.getElementById("workoutForm");
    let formGroup = workoutForm.getElementsByClassName("form-group")[0];
    formGroup.innerHTML = "";
    //continue making the form on js that will populate as a modal
    let workoutUnit = workoutTypes[workoutType];
    let titleLabel = document.createElement("label");
    titleLabel.innerHTML = "Title of Workout";
    formGroup.appendChild(titleLabel);
    let workoutTitle = document.createElement("input");
    workoutTitle.type = "text";
    workoutTitle.id = "workoutTitle";
    formGroup.appendChild(workoutTitle);
    // let descriptionLabel = document.createElement("label");
    // descriptionLabel.innerHTML = "Description of Workout";
    // workoutForm.appendChild(descriptionLabel);
    // let workoutDescription = document.createElement("input");
    // workoutDescription.type = "text";
    // workoutDescription.id = "workoutDescription";
    // workoutForm.appendChild(workoutDescription);
    let workoutUnitLabel = document.createElement("label");
    workoutUnitLabel.innerHTML = "Unit of Workout";
    formGroup.appendChild(workoutUnitLabel);
    let workoutUnitSelect = document.createElement("select");
    workoutUnitSelect.id = "workoutUnit";
    formGroup.appendChild(workoutUnitSelect);
    for (let i = 0; i < workoutUnit.length; i++) {
        let option = document.createElement("option");
        option.value = workoutUnit[i];
        option.innerHTML = workoutUnit[i];
        workoutUnitSelect.appendChild(option);
    }
    let workoutAmountLabel = document.createElement("label");
    workoutAmountLabel.innerHTML = "Amount of Workout";
    formGroup.appendChild(workoutAmountLabel);
    let workoutAmount = document.createElement("input");
    workoutAmount.type = "number";
    workoutAmount.id = "workoutAmount";
    formGroup.appendChild(workoutAmount);
    let workoutDurationLabel = document.createElement("label");
    workoutDurationLabel.innerHTML = "Duration of Workout";
    formGroup.appendChild(workoutDurationLabel);
    let workoutDuration = document.createElement("input");
    workoutDuration.type = "number";
    workoutDuration.id = "workoutDuration";
    formGroup.appendChild(workoutDuration);
    // let submit = document.createElement("button");
    // submit.innerHTML = "Submit";
    // submit.type = "submit";
    // submit.Id = "submitWorkout";
    // formGroup.appendChild(submit);
    formGroup.style.display = "flex";
    formGroup.style.flexDirection = "column";
    modal.style.display = "block";
});

close1.addEventListener("click", async (event) => {
    modal.style.display = "none";
});
submitWorkout.addEventListener("click", async (event) => {
    event.preventDefault();
    let workoutType = document.getElementById("workoutType").value;
    let workoutTitle = document.getElementById("workoutTitle").value;
    let workoutUnit = document.getElementById("workoutUnit").value;
    let workoutAmount = document.getElementById("workoutAmount").value;
    let workoutDuration = document.getElementById("workoutDuration").value;
    workoutType = isValidString(workoutType, "workoutType");
    workoutTitle = isValidString(workoutTitle, "workoutTitle");
    workoutUnit = isValidString(workoutUnit, "workoutUnit");
    workoutAmount = isValidInt(workoutAmount, "workoutAmount");
    workoutDuration = isValidInt(workoutDuration, "workoutDuration");
    let workout = {
        title: workoutTitle,
        amountOfWorkout: workoutAmount,
        unitOfWorkout: workoutUnit,
        duration: workoutDuration,
        type: workoutType
    };
    let response = await fetch("/dashboard/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
    });
    if (response.status !== 200) {
        alert("Error adding workout");
    }else{
        location.reload();
    }
});