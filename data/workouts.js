// this is the different workouts that the user can choose from
// decided to make it as standard as possible so
import helpers from "../helpers.js";
import { workouts } from "../config/mongoCollections.js";

const exports = {
  async createWorkoutType(type, unitOfWorkout){
    type = helpers.isValidString(type, "type");
    for(let i = 0; i < unitOfWorkout.length; i++){
      unitOfWorkout[i] = helpers.isValidString(unitOfWorkout[i], "unitOfWorkout");
    }
    const workoutCollection = await workouts();
    const insertInfo = await workoutCollection.insertOne({
      type,
      unitOfWorkout,
    });
    if (insertInfo.insertedCount === 0) {
      throw "Error: could not add workout type";
    }
    return await this.getWorkoutsByType(type);

  },
  async getWorkoutById(id) {
    id = helpers.isValidObjectId(id);
    const workoutCollection = await workouts();
    const workout = await workoutCollection.findOne({ _id: id });

    if (!workout) {
      throw "Error: workout not found";
    }

    return workout;
  },
  async getWorkoutsByType(type) {
    type = helpers.isValidString(type, "type");
    const workoutCollection = await workouts();
    const workoutList = await workoutCollection.find({ type }).toArray();
    if (!workoutList) {
      throw "Error: no workouts found";
    }
    return workoutList;
  },
};

export default exports;
