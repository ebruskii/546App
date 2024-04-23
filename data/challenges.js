import helpers from "../helpers.js";
import { challenges } from "../config/mongoCollections.js";

const exports = {
  async createChallenge(title, description, goal, type, creator) {
    title = helpers.isValidString(title, "title");
    description = helpers.isValidString(description, "description");
    startDate = helpers.getNextMonday();
    startDate = helpers.generateDate(startDate);
    endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // make it last for 1 week
    goal = helpers.isValidInt(goal, "goal");
    type = helpers.isValidString(type, "type");
    creator = helpers.isValidObjectId(creator);

    const challengeCollection = await challenges();
    const insertResult = await challengeCollection.insertOne({
      title,
      description,
      startDate: endDate,
      goal,
      type,
      creator,
      dateCreated: helpers.generateDate(),
    });

    if (!insertResult.acknowledged || !insertResult.insertedId) {
      throw "Failed to insert challenge";
    }

    const newChallenge = await challengeCollection.findOne({
      _id: insertResult.insertedId,
    });
    if (!newChallenge) {
      throw "Error getting newly created challenge";
    }

    return newChallenge._id.toString();
  },

  async getChallengeById(id) {
    id = helpers.isValidObjectId(id);
    const challengeCollection = await challenges();
    const challenge = await challengeCollection.findOne({ _id: id });

    if (!challenge) {
      throw "Error: challenge not found";
    }

    return challenge;
  },
};
