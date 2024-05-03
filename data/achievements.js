// achievments that we will set outselves

import helpers from "./helpers.js";
import { achievements } from "./mongoCollections.js";

const exports = {
  async createAchievement(title, description, goal, type, unitOfWorkout, creator) {
    title = helpers.isValidString(title, "title");
    description = helpers.isValidString(description, "description");
    goal = helpers.isValidInt(goal, "goal");
    type = helpers.isValidString(type, "type");
    unitOfWorkout = helpers.isValidString(unitOfWorkout, "unitOfWorkout");
    creator = helpers.isValidObjectId(creator);

    const achievementCollection = await achievements();
    const insertResult = await achievementCollection.insertOne({
      title,
      description,
      goal,
      type,
      creator,
      unitOfWorkout,
      dateCreated: helpers.generateDate(),
    });

    if (!insertResult.acknowledged || !insertResult.insertedId) {
      throw "Failed to insert achievement";
    }

    const newAchievement = await achievementCollection.findOne({
      _id: insertResult.insertedId,
    });
    if (!newAchievement) {
      throw "Error getting newly created achievement";
    }

    return newAchievement._id.toString();
  },

  async getAchievementById(id) {
    id = helpers.isValidObjectId(id);
    const achievementCollection = await achievements();
    const achievement = await achievementCollection.findOne({ _id: id });

    if (!achievement) {
      throw "Error: achievement not found";
    }

    return achievement;
  },

  async getAchievementByTitle(title) {
    title = helpers.isValidString(title, "title");
    const achievementCollection = await achievements();
    const achievement = await achievementCollection.findOne({ title: title });

    if (!achievement) {
      throw "Error: achievement not found";
    }

    return achievement;
  },

  async getAllAchievements() {
    const achievementCollection = await achievements();
    const achievementList = await achievementCollection.find({}).toArray();

    if (!achievementList) {
      throw "Error: no achievements found";
    }

    return achievementList;
  },

  async getAchievementsByType(type) {
    type = helpers.isValidString(type, "type");
    const achievementCollection = await achievements();
    const achievementList = await achievementCollection
      .find({ type: type })
      .toArray();

    if (!achievementList) {
      throw "Error: no achievements found";
    }

    return achievementList;
  },
};

export default exports;
