let workoutbutton = document.getElementById("addWorkout");
let modalType = document.getElementById("addWorkoutModalType");
let modal = document.getElementById("addWorkoutModal");
let findWorkout = document.getElementById("findWorkout");
workoutbutton.addEventListener("click", async (event) => {
    modalType.style.display = "block";

});
findWorkout.addEventListener("click", async (event) => {
    event.preventDefault();
    modalType.style.display = "none";
    let workoutType = document.getElementById("workoutType").value;
    let workoutForm = document.getElementById("workoutForm");
    //continue making the form on js that will populate as a modal


    

    modal.style.display = "block";
});