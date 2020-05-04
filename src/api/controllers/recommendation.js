const ApiError = require('../errors/ApiError');
const models = require('../../models');
const sortByDistance = require('sort-by-distance');
// const yandeximages = require("yandex-images");
const fetch = require('node-fetch');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var {image_search} = require("duckduckgo-images-api");
// const fs = require('fs');

const { getRecomendations } = require('../../services/personalizeService');
// const { getUserPreferences } = require('../../controllers/user');


const { 
  // search,
  searchTags,
  searchLocation3,
  searchLocations,
  searchPosts
} = require('../../services/elasticService');


module.exports = {
  getRecommendation: async (req, res, next) => {
    try {
      //1) user
      const { userId } = req.session;
      // const userId = 1;
      console.log('1','userId',userId);

      var categories;

      //2) get data
      const currentLocation = req.query.currentLocation 
        ? req.query.recommendationId 
        : {"lat":55.7501898,"lan":37.795363099999996};

      const categoryId = req.query.recommendationId ? req.query.recommendationId : 1;

      console.log('2','currentLocation',currentLocation);
      console.log('2','categoryId',categoryId);

      // 3) get preferences
      const preferences = await models.userPreferences.find({ userId }, ['preference'])
        // .then(preferences => await searchTag(preferences));
        .then(preferences => preferences.map(({ preference }) => preference));

      console.log('3','preferences',preferences);

      const tags = await searchTags(preferences);
      // console.log('3','tags',tags);
      console.log('3','tags.length',tags.length);

      var uniqueLocationIds;

      if(!tags || tags === undefined || tags.length == 0){
        // throw new ApiError('TAG_NOT_FOUND');
        uniqueLocationIds = await getRecomendations('кафе');
        // console.log('4','uniqueLocationIds',uniqueLocationIds); 
      } else {
        var finallocationIds = [];

        for (var i = tags.length - 1; i >= 0; i--) {
          //4) get ids from personalize
          var locationIds = await getRecomendations(tags[i].HashTag);
          // console.log('4','res',locationIds); 
          finallocationIds.push(locationIds);
          // if (data.indexOf(element) === index) {
            // finallocationIds.push(locationIds)
          // }
        }
        uniqueLocationIds = [...new Set(finallocationIds.flat())];
      }

      // console.log('5','uniqueLocationIds',uniqueLocationIds); 
      console.log('5','uniqueLocationIds.length',uniqueLocationIds.length);

      if(!uniqueLocationIds){
        throw new ApiError('PERSONALIZE_EMPTY');
      }

      //5) get hashtag and type by location_id in location3
      const locationHashes = await searchLocation3(uniqueLocationIds);//types
      // console.log('5','locationHashes',locationHashes);

      if(!locationHashes){
        throw new ApiError('LOCATIONS3_EMPTY');
      }

      //6) category
      switch (categoryId) {
        case '1':
         categories = ['музей','Достопримечательность','Клуб для детей и подростков','Курсы','мастер-классы'];
          break;
        case '2':
         categories = ['концерт','Ночной клуб','Караоке-клуб','Концертный зал','Блядство разврат наркотики','клуб','разврат','Рок'];
          // const types = ['Итальянская кухня', 'мясо', 'Паназиатская кухня', 'Морепродукты', 'Кавказская кухня', 'Европейская кухня', 'Выпить и закусить'];
          break;
        case '3':
         categories = ['Ресторан','кафе','бар','паб','столовая','Пиццерия','Кофейня','Кондитерская','кухня'];
          // const types = ['Итальянская кухня', 'мясо', 'Паназиатская кухня', 'Морепродукты', 'Кавказская кухня', 'Европейская кухня', 'Выпить и закусить'];
          break;
        case '4':
         categories = ['выставка','Современный','Художественный','салон','Выставочный центр','Антикварный магазин','Парк аттракционов','Развлекательный центр','Аттракцион'];
          break;
        default:
          categories = ['музей','кафе','выставка','клуб'];
      }

      const filteredHashes = locationHashes.filter(location => {
        //get each element
        //split by word
        //check include word in array
        //if yes 
        if(location.type != null){
          const words = location.type.split(' ').filter(Boolean)

          const result = words.map(word => {
            return categories.includes(word)
          })

          // console.log('result_inside',result);

          if(result.includes(true)){
            return location
          }
        }
      });

      // console.log('6','filteredHashes',filteredHashes);
      console.log('6','filteredHashes.length',filteredHashes.length);
      
      const getLocationData = async location => {
        //7) set locationData
        const locations = await searchLocations(location.name)//categories
        // console.log('7','locations',locations);

        //8) get posts from location
        const posts = await searchPosts(location.hash);
        // console.log('8','posts',posts);

        if(!posts){
          throw new ApiError('POSTS_EMPTY');
        }

        //9) get mainphoto from yandex
        async function callshift (website, callback){
          if(website || website !== undefined){
            // try {
              const query = website.replace(/(^\w+:|^)\/\//, '').slice(0,-1);// + '&iax=images&ia=images';

              console.log('query',query);

              // result = await new Promise(resolve => 
              //     setTimeout(function() 
              //     {
              //       var query = name + '&iax=images&ia=images';
              //       // var query = location.website.replace(/(^\w+:|^)\/\//, '') + '&iax=images&ia=images';

              //       image_search({ query: query, moderate: true }, 1, 1).then(
              //         res => {
              //             if (res.ok) {
              //                 console.log('duckduckGo ok.');
              //                 resolve(res)
              //             } else {
              //                 console.log('duckduckGo error');
              //             }
              //         }
              //       );
              //     }, 100)
              // );

              image_search({ query: query, moderate: false }, 2, 1).then(
                  res => {
                      console.log('res',res[0]);
                      if (res || res !== undefined) {
                          console.log('duckduckGo ok.');
                          callback(res[0].image)
                      } else {
                          console.log('duckduckGo error');
                      }
                  }
                );

              // return result[0].image
          //   } catch (error) {
          //     console.log(error);
          //   }
          }
        };

        //10) filter photos if not exist
        const checkResource = async post => {
          fetch(post.display_url, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    console.log('Image exists.');
                    return post.display_url
                } else {
                    console.log('Image does not exist.');
                }
            })//.catch(err => console.log('Error:', err));

          return post.display_url
       };

        const filterPhotos = posts => Promise.all(posts.map(checkResource));

        // const getPhoto = website => Promise.all(callshift(website));
        // const getPhoto = locations => Promise.all(locations.map(callshift));

        if(locations[0] != null){
            return Object.assign(locations[0], {
              photo: await filterPhotos(posts),
              mainphoto: await new Promise(resolve => callshift(locations[0].website, res => resolve(res)))
              // mainPhoto: await getPhoto(locations[0].website)
              //get website from location
              //
            })
        }
      }

      const setLocationData = filteredHashes => Promise.all(filteredHashes.map(getLocationData));

      const locationsData = await setLocationData(filteredHashes);

      if(!locationsData){
        throw new ApiError('LOCATIONS_EMPTY');
      }

      // console.log('10','locationsData',locationsData);
      console.log('10','locationsData.length',locationsData.length);

      //10) sort by distance  -----> REMOVE AFTER UPLOAD NEW DATA 
      const test = locationsData.map((item) => {

        if(item != null){
         return Object.assign(
          // id: ,
          {latitude: item.location.lat}, 
          {longitude: item.location.lon}, 
          {googleLink: 'https://www.google.com/maps/place/'+ item.address.trim() +'/@'+ item.location.lat + ',' + item.location.lon},
          {description: 'text'}, //-----> SET HERE TEXT
          // {item.photos: item.photos.filter(photo => {
          //   return 
          // })},
          {positiveReviews: 1996},
          {negativeReviews: 174},
          {averageBillUSD: 30},
          {restriction: null},
          {numberOfUsersSelectedThisLocation: 27},
          {lastFiveUsersSelectedThisLocation: [
            'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e15/10986232_792204010864591_1943951351_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=0CefYx0zadQAX8p5bip&oh=fcd26afd66d0b7457361ae7fe17d085e&oe=5EB31E94',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/22708961_137397253576283_1641343055204188160_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=OfmyBIOuIeYAX8nTOit&oh=f1ba466480f93e66485892d710fa4b1a&oe=5EB044C8',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/71024040_130228614600586_7919094803550290139_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=y4DWTigwpR8AX9xvyj4&oh=29a25d5b1ca3fe8e819f568107e605b3&oe=5EAE41D7',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/82093019_2496883707190074_7533803060583622926_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=UPkeN14n8nsAX9UCYqq&oh=9c3fff6fb03b4a5727809198c9f6dacc&oe=5EAF176E',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/88257534_538727656756767_5275621189640973434_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=Dlvjhc4WN0UAX8xjzEK&oh=3d967b5544d0dd27ef0e41119a90294e&oe=5EADCFDB',
          ]},
          {item}) 
        }
        // delete Object.assign(item, {['title']: item['name'] })['name'];
      })

      const opts = {
        yName: 'latitude',
        xName: 'longitude'
      }

      var results

      if(currentLocation != null && test != null){
        results = sortByDistance(currentLocation, test, opts)
      }else{
        results = test
      }

      // console.log('11','results',results);

      const final = test.filter(location => {
        if(location != null){
          return location
        }else{
          console.log('UNDEFINED')
        }
      })

      console.log('12','length',results.length);

      res.json(final.slice(0,5));
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
