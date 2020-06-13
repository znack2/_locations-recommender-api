const models = require('../../models');
const ApiError = require('../errors/ApiError');

module.exports = {
  getScore: async (req, res, next) => {
    try {
      const {userId} = req.query;
      let scores;
      if (!userId) {
        scores = await models.users.find({}, ["id", "score", "username"]);
      } else {
        scores = await models.users.find({id: userId}, ["id", "score", "username"]);
      }
      res.json(scores);
    } catch (error) {
      next(error);
    }
  },
  getQuestion: async (req, res, next) => {
    try {
      const {route_id, question_id} = req.params;
      const question = await models.questions.findOne({route_id, id: question_id}, 'question');
      res.json(question);
    } catch (error) {
      next(error);
    }
  },
  createAnswer: async (req, res, next) => {
    try {
      const {route_id, question_id} = req.params;
      const {answer} = req.body;
      const {userId} = req.session;
      if (!answer || typeof answer !== 'string') {
        throw new ApiError('INVALID_PREFERENCE');
      }
      const answerDb = await models.answers.findOne({userId, route_id, question_id});
      if (answerDb) {

      }
      //TODO: you already asked and in model question add reference, and notification
      const user = await models.users.findOne({id: userId});
      const question = await models.questions.findOne({route_id, id: question_id});
      if (!question) {
        throw new ApiError("QUESTION_NOT_FOUND");
      }
      await models.answers.create({userId: user.id, answer, question_id, route_id});
      if (question.answer === answer) {
        await models.users.update({id: userId}, {score: user.score + question.coins_value});
        return res.json({result: 1, coins_value: question.coins_value});
      }
      res.json({result: 0, coins_value: 0});
    } catch (error) {
      next(error);
    }
  },
};