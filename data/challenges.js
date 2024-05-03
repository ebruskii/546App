import helpers from "../helpers.js";
import { challenges } from "../config/mongoCollections.js";

const exports = {
  async createChallenge(title, description, type, unitOfWorkout, creator) {
    title = helpers.isValidString(title, "title");
    description = helpers.isValidString(description, "description");
    let startDate = helpers.generateDate();
    let endDate = helpers.getNextWeek(); // make it last for 1 week
    type = helpers.isValidString(type, "type");
    unitOfWorkout = helpers.isValidString(unitOfWorkout, "unitofWorkout");
    creator = helpers.isValidString(creator);

    const challengeCollection = await challenges();
    const insertResult = await challengeCollection.insertOne({
      title,
      description,
      startDate,
      endDate,
      type,
      unitOfWorkout,
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

    return { created: true, challenge: newChallenge };
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

  async getAllChallenges() {
    const challengeCollection = await challenges();
    const challengeList = await challengeCollection.find({}).toArray();

    if (!challengeList) {
      throw "Error: no challenges found";
    }

    return challengeList;
  },

  async deleteChallenge(id) {
    id = helpers.isValidObjectId(id);
    const challengeCollection = await challenges();
    const deleteInfo = await challengeCollection.deleteOne({ _id: id });

    if (deleteInfo.deletedCount === 0) {
      throw `Error: could not delete challenge with id ${id}`;
    }
  },
};

export default exports;
