const ApiError = require('../errors/ApiError');

module.exports = {
  getRecommendation: async (req, res, next) => {
    try {
      res.json({
        success: true,
        data: {
          id: 1,
          type: 'restaurant',
          address: 'Новый Арбат ул., 17, Москва',
          latitude: 55.7520819,
          longitude: 37.5908509,
          googleLink: 'https://www.google.com/maps/place/Burger+Heroes/@55.7404139,37.568048,14z/data=!4m9!1m2!2m1!1sburger+heroes!3m5!1s0x0:0xfc83d2fa659f8044!8m2!3d55.7520819!4d37.5908509!10e1',
          title: 'Burger Heroes',
          description: 'Some description goes in here...',
          cost: '₽₽',
          website: 'burgerheroes.ru',
          phoneNumber: '8 (916) 800-24-30',
          restriction: null,
          workHours: '12:00-23:45',
          rating: 4.6,
          reviewsCount: 807
        }
      });
    } catch (error) {
      return next(error);
    }
  },
  skipRecommendation: async (req, res, next) => {
    try {
      const { recommendationId } = req.body;

      if (!recommendationId) {
        throw new ApiError('RECOMMENDATION_ID_REQUIRED');
      }

      res.json({
        success: true
      });
    } catch (error) {
      return next(error);
    }
  },
  selectRecommendation: async (req, res, next) => {
    try {
      const { recommendationId } = req.body;

      if (!recommendationId) {
        throw new ApiError('RECOMMENDATION_ID_REQUIRED');
      }

      res.json({
        success: true
      });
    } catch (error) {
      return next(error);
    }
  },
};
