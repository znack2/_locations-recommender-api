const models = require('../../models');
const ApiError = require('../errors/ApiError');
const request = require('request');

module.exports = {
  getScore: async (req, res, next) => {
    try {
      const {userId} = req.query;
      let scores;
      if (!userId) {
        scores = await models.users.find({}, ["id", "coins_value", "username"]);
      } else {
        scores = await models.users.find({id: userId}, ["id", "coins_value", "username"]);
      }
      res.json(scores);
    } catch (error) {
      next(error);
    }
  },
  getQuestion: async (req, res, next) => {
    try {
      const {route_id, question_id} = req.params;
      const question = await models.questions.findOne(
          {route_id, id: question_id},
          ['id','question', 'answers','route_id','location','coins_value','reference']);
      if (!question) {
        return res.json(question);
      }
      const url = 'https://moscow-walks.forcode.pro/react_admin/api/places_bot_plugin/place/' + question.location;
      const headers = {
        authorization: 'Token 97133dfe9195453d8bf9edd71bcfe4d08df803df'
      };
      await request.get({url, headers}, (error, response, body) => {
        const result = JSON.parse(body);
        return res.status(200).json({question, place:result});
      });
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
        throw new ApiError('INVALID_ANSWER');
      }
      const answerDb = await models.answers.findOne({userId, route_id, question_id});
      if (answerDb) {
        throw new ApiError('ANSWER_ALREADY_EXISTS');
      }
      const user = await models.users.findOne({id: userId});
      const question = await models.questions.findOne({route_id, id: question_id});
      if (!question) {
        throw new ApiError("QUESTION_NOT_FOUND");
      }
      await models.answers.create({userId: user.id, answer, question_id, route_id});
      if (question.correct_answer === answer) {
        await models.users.update({id: userId}, {coins_value: user.coins_value + question.coins_value});
        return res.json({result: 1, coins_value: question.coins_value, next_question: "19 min"});
      }
      res.json({result: 0, coins_value: 0, next_question: "19 min"});
    } catch (error) {
      next(error);
    }
  },
};