const ApiError = require('../errors/ApiError');

module.exports = {
  getRecommendation: async (req, res, next) => {
    try {
      res.json([
        {
          id: 1,
          type: 'restaurant',
          address: 'Новый Арбат ул., 17, Москва',
          latitude: 55.7520819,
          longitude: 37.5908509,
          googleLink: 'https://www.google.com/maps/place/Burger+Heroes/@55.7404139,37.568048,14z/data=!4m9!1m2!2m1!1sburger+heroes!3m5!1s0x0:0xfc83d2fa659f8044!8m2!3d55.7520819!4d37.5908509!10e1',
          title: 'Burger Heroes',
          description: 'Some description goes in here...',
          photos: [
            'https://lh5.googleusercontent.com/p/AF1QipPM3MN6cHy4i5vTQr9qa0LGVTBKe6tRoTcGA0qf=w408-h306-k-no',
            'https://lh5.googleusercontent.com/p/AF1QipM-z4DwQ3qy8uIuaHRf514t_Rse-yTjUd--5Jg5=w203-h152-k-no',
            'https://lh5.googleusercontent.com/p/AF1QipPaoAATm69aMhkAZBEfcBiUZsoEkudOg1ReVWjp=w203-h151-k-no'
          ],
          averageBillUSD: 18,
          website: 'burgerheroes.ru',
          phoneNumber: '8 (916) 800-24-30',
          restriction: null,
          workHours: {
            from: '12:00',
            until: '23:45'
          },
          positiveReviews: 765,
          negativeReviews: 16,
          numberOfUsersSelectedThisLocation: 19,
          lastFiveUsersSelectedThisLocation: [
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/64923381_881064312271761_2589126738386616320_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=YLb8V6C0fIgAX9wrW2p&oh=117fbcf9cdf45ea3e3cbd70cde0dc1cb&oe=5EAFB1DD',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/88217547_2944243185598782_2169620360415150080_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=k034JFozj_sAX-sAMSe&oh=6540adab7f0e2c02fb0926b95d9dd167&oe=5EAFA699',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/21690765_1488076617951946_6807094496359088128_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=br21EFIJSC8AX-kLCd7&oh=a217197b421a3bc8f52efb77acb9d61d&oe=5EAD431C',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90997701_197959671624920_1876362540359876608_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=AcPJB5VqnigAX936m2X&oh=1523d23c9818581b675fffaf56d1ef3d&oe=5EAEB470',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/70602698_726599487861803_4908438730680827904_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=9LH1Z6UAYQYAX8XsmZR&oh=14ea1e867717ca0b27dbc3e734721af5&oe=5EAD5BCE'
          ]
        },
        {
          id: 1,
          type: 'restaurant',
          address: 'Новый Арбат ул., 17, Москва',
          latitude: 55.7520819,
          longitude: 37.5908509,
          googleLink: 'https://www.google.com/maps/place/Burger+Heroes/@55.7404139,37.568048,14z/data=!4m9!1m2!2m1!1sburger+heroes!3m5!1s0x0:0xfc83d2fa659f8044!8m2!3d55.7520819!4d37.5908509!10e1',
          title: 'Burger Heroes',
          description: 'Some description goes in here...',
          photos: [
            'https://lh5.googleusercontent.com/p/AF1QipPM3MN6cHy4i5vTQr9qa0LGVTBKe6tRoTcGA0qf=w408-h306-k-no',
            'https://lh5.googleusercontent.com/p/AF1QipM-z4DwQ3qy8uIuaHRf514t_Rse-yTjUd--5Jg5=w203-h152-k-no',
            'https://lh5.googleusercontent.com/p/AF1QipPaoAATm69aMhkAZBEfcBiUZsoEkudOg1ReVWjp=w203-h151-k-no'
          ],
          averageBillUSD: 18,
          website: 'burgerheroes.ru',
          phoneNumber: '8 (916) 800-24-30',
          restriction: null,
          workHours: {
            from: '12:00',
            until: '23:45'
          },
          positiveReviews: 765,
          negativeReviews: 16,
          numberOfUsersSelectedThisLocation: 19,
          lastFiveUsersSelectedThisLocation: [
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/64923381_881064312271761_2589126738386616320_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=YLb8V6C0fIgAX9wrW2p&oh=117fbcf9cdf45ea3e3cbd70cde0dc1cb&oe=5EAFB1DD',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/88217547_2944243185598782_2169620360415150080_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=k034JFozj_sAX-sAMSe&oh=6540adab7f0e2c02fb0926b95d9dd167&oe=5EAFA699',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/21690765_1488076617951946_6807094496359088128_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=br21EFIJSC8AX-kLCd7&oh=a217197b421a3bc8f52efb77acb9d61d&oe=5EAD431C',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90997701_197959671624920_1876362540359876608_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=AcPJB5VqnigAX936m2X&oh=1523d23c9818581b675fffaf56d1ef3d&oe=5EAEB470',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/70602698_726599487861803_4908438730680827904_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=9LH1Z6UAYQYAX8XsmZR&oh=14ea1e867717ca0b27dbc3e734721af5&oe=5EAD5BCE'
          ]
        },
        {
          id: 1,
          type: 'restaurant',
          address: 'Новый Арбат ул., 17, Москва',
          latitude: 55.7520819,
          longitude: 37.5908509,
          googleLink: 'https://www.google.com/maps/place/Burger+Heroes/@55.7404139,37.568048,14z/data=!4m9!1m2!2m1!1sburger+heroes!3m5!1s0x0:0xfc83d2fa659f8044!8m2!3d55.7520819!4d37.5908509!10e1',
          title: 'Burger Heroes',
          description: 'Some description goes in here...',
          photos: [
            'https://lh5.googleusercontent.com/p/AF1QipPM3MN6cHy4i5vTQr9qa0LGVTBKe6tRoTcGA0qf=w408-h306-k-no',
            'https://lh5.googleusercontent.com/p/AF1QipM-z4DwQ3qy8uIuaHRf514t_Rse-yTjUd--5Jg5=w203-h152-k-no',
            'https://lh5.googleusercontent.com/p/AF1QipPaoAATm69aMhkAZBEfcBiUZsoEkudOg1ReVWjp=w203-h151-k-no'
          ],
          averageBillUSD: 18,
          website: 'burgerheroes.ru',
          phoneNumber: '8 (916) 800-24-30',
          restriction: null,
          workHours: {
            from: '12:00',
            until: '23:45'
          },
          positiveReviews: 765,
          negativeReviews: 16,
          numberOfUsersSelectedThisLocation: 19,
          lastFiveUsersSelectedThisLocation: [
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/64923381_881064312271761_2589126738386616320_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=YLb8V6C0fIgAX9wrW2p&oh=117fbcf9cdf45ea3e3cbd70cde0dc1cb&oe=5EAFB1DD',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/88217547_2944243185598782_2169620360415150080_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=k034JFozj_sAX-sAMSe&oh=6540adab7f0e2c02fb0926b95d9dd167&oe=5EAFA699',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/21690765_1488076617951946_6807094496359088128_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=br21EFIJSC8AX-kLCd7&oh=a217197b421a3bc8f52efb77acb9d61d&oe=5EAD431C',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90997701_197959671624920_1876362540359876608_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=AcPJB5VqnigAX936m2X&oh=1523d23c9818581b675fffaf56d1ef3d&oe=5EAEB470',
            'https://instagram.frix3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/70602698_726599487861803_4908438730680827904_n.jpg?_nc_ht=instagram.frix3-1.fna.fbcdn.net&_nc_ohc=9LH1Z6UAYQYAX8XsmZR&oh=14ea1e867717ca0b27dbc3e734721af5&oe=5EAD5BCE'
          ]
        }
      ]);
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
