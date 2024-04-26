// this is the different workouts that the user can choose from
// decided to make it as standard as possible so
import helpers from "../helpers.js";
import { workouts } from "../config/mongoCollections.js";

const exports = {
  async createWorkout(title, description, duration, type, creator) {
    title = helpers.isValidString(title, "title");
    description = helpers.isValidString(description, "description");
    duration = helpers.isValidInt(duration, "duration");
    type = helpers.isValidString(type, "type");
    creator = helpers.isValidObjectId(creator);

    const workoutCollection = await workouts();
    const insertResult = await workoutCollection.insertOne({
      title,
      description,
      duration,
      type,
      creator,
      dateCreated: helpers.generateDate(),
    });

    if (!insertResult.acknowledged || !insertResult.insertedId) {
      throw "Failed to insert workout";
    }

    const newWorkout = await workoutCollection.findOne({
      _id: insertResult.insertedId,
    });
    if (!newWorkout) {
      throw "Error getting newly created workout";
    }

    return newWorkout._id.toString();
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

  async getAllWorkouts() {
    const workoutCollection = await workouts();
    const workoutList = await workoutCollection.find({}).toArray();

    if (!workoutList) {
      throw "Error: no workouts found";
    }

    return workoutList;
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

  async updateWorkout(id, title, description, duration, type) {
    id = helpers.isValidObjectId(id);
    title = helpers.isValidString(title, "title");
    description = helpers.isValidString(description, "description");
    duration = helpers.isValidInt(duration, "duration");
    type = helpers.isValidString(type, "type");

    const workoutCollection = await workouts();
    const updateInfo = await workoutCollection.updateOne(
      { _id: id },
      {
        $set: {
          title,
          description,
          duration,
          type,
        },
      }
    );

    if (updateInfo.modifiedCount === 0) {
      throw "Error: could not update workout";
    }

    return await this.getWorkoutById(id);
  },
};

export default exports;
