const ApiError = require('../errors/ApiError');
const models = require('../../models');
const sortByDistance = require('sort-by-distance');
// const yandeximages = require("yandex-images");
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const axios = require("axios");
const fs = require('fs');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var {image_search} = require("duckduckgo-images-api");
// const fs = require('fs');
// var search = require('image-search');
// var rp = require('request-promise');


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
      const { userId } = req.session;

      const currentLocation = req.query.currentLocation 
        ? req.query.recommendationId 
        : {"lat":54.7501898,"lan":36.795363099999996};

      const categoryId = req.query.recommendationId ? req.query.recommendationId : 5;

      const preferences = await models.userPreferences.find({ userId }, ['preference'])
        .then(preferences => preferences.map(({ preference }) => preference));

      const tags = await searchTags(preferences);

      var uniqueLocationIds;

      if(!tags || tags === undefined || tags.length == 0)
        {
          uniqueLocationIds = await getRecomendations('кафе');
        } 
      else 
        {
          var finallocationIds = [];

          for (var i = tags.length - 1; i >= 0; i--) {
            var locationIds = await getRecomendations(tags[i].HashTag);
            finallocationIds.push(locationIds);
          }
          uniqueLocationIds = [...new Set(finallocationIds.flat())];
        }

      if(!uniqueLocationIds){
        throw new ApiError('PERSONALIZE_EMPTY');
      }

      const locationHashes = await searchLocation3(uniqueLocationIds);

      if(!locationHashes){
        throw new ApiError('LOCATIONS3_EMPTY');
      }

      var categories;

      switch (categoryId) {
        case '1':
         categories = ['музей','Достопримечательность','Клуб для детей и подростков','Курсы','мастер-классы'];
          break;
        case '2':
         categories = ['концерт','Ночной клуб','Караоке-клуб','Концертный зал','Блядство разврат наркотики','клуб','разврат','Рок'];
          break;
        case '3':
         categories = ['Ресторан','кафе','бар','паб','столовая','Пиццерия','Кофейня','Кондитерская','кухня'];
          break;
        case '4':
         categories = ['выставка','Современный','Художественный','салон','Выставочный центр','Антикварный магазин','Парк аттракционов','Развлекательный центр','Аттракцион'];
          break;
        default:
          categories = ['музей','кафе','выставка','клуб','кухня','Рок'];
      }

      const filteredHashes = locationHashes.filter(location => {
        if(location.type != null){
          var words = location.type.split(' ').filter(Boolean)
          var result = words.map(word => {
            return categories.includes(word)
          })

          if(result.includes(true)){
            return location
          }
        }
      });

      function timeout(ms, promise) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            reject(new Error("timeout"))
            // console.log('timeout');
          }, ms)
          promise.then(resolve, reject)
        })
      }

      const getLocationData = async location => {

        var locationData = await searchLocations(location.name)//categories

        if(locationData.length == 0){
          return;
        }
        var posts = await searchPosts(location.hash);
       
        if(!posts){
          throw new ApiError('POSTS_EMPTY');
        }

        if(locationData[0] != null){

            // async function getMainPhoto (location, callback){

            //   if(location.website && location.website !== undefined){

            //       var query = location.website.replace(/(^\w+:|^)\/\//, '');//.slice(0,-1);// + '&iax=images&ia=images';
            //       image_search({ query: query, moderate: false }, 2, 1)
            //         .then(function(result) {
            //         if (result && result !== undefined && result[0] !== undefined) {
            //             // console.log('duckduckGo ok.');
            //             callback({
            //               photo:result[0].image, 
            //               url:result[0].url
            //             })
            //         } else {
            //             callback({
            //               photo: 'https://img.freepik.com/free-vector/colorful-smooth-gradient-background_97886-980.jpg?size=626&ext=jpg', 
            //               url: null
            //             })
            //         }
            //       }).catch(function(error) { })
            //   }
            // };

            // async function checkResource(post){//const functionName = async post => 
            //   var photoArray = [];

            //   if(post && post != undefined){

            //     var photo = fetch(post.display_url, { method: 'HEAD' }).then(function(result) {
            //         if (result.ok) {
            //             var link = post.display_url.substring(0, post.display_url.indexOf('?'));
            //             if(photoArray.includes(link)){
            //             } else {
            //               photoArray.push(link);
            //               return post.display_url
            //             }
            //         } else {
            //         }
            //       }).catch(function(error) {
            //       })
            //     return photo
            //   }
            // };

            // async function getDescription (link, callback){
            //   if(!link || link == null){
            //     callback('some text')
            //   } else {
            //       var { data } = await axios.get(link)

            //       var $ = cheerio.load(data,{
            //          ignoreWhitespace: true
            //        });

            //       $desc = $('meta[name="description"]').attr('content')

            //       callback($desc);
            //   }
            // };

            // async function filterPhotos(posts) {
            //     let result = [];

            //     while (posts.length) {
            //         let batch = posts.splice(0,3); // make 3 requests in parallel

            //         let batchResult = await Promise.all(batch.map(x => {
            //             return checkResource(x);
            //         }));

            //         result = result.concat(batchResult);
            //     }
            //     return result;
            // }

            // var photos = await filterPhotos(posts)

            // const PhotoData = await new Promise(resolve => getMainPhoto(locationData[0], result => resolve(result)))
            // const description = await new Promise(resolve => getDescription(PhotoData.url, result => resolve(result)))

            return Object.assign(locationData[0], {
              photo: [
                'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/67451683_1162223687313525_9073398506671709435_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Scb_MV4TUHoAX-GSCkD&oh=d8c6f3e221e8fa94129461d871bbc958&oe=5EC97B45',
                'https://scontent-frt3-1.cdninstagram.com/v/t51.2815-15/sh0.08/e35/c0.180.1440.1440a/s640x640/67451683_1162223687313525_9073398506671709435_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Scb_MV4TUHoAX-GSCkD&oh=d8c6f3e221e8fa94129461d871bbc958&oe=5EC97B45'
              ],//photos.length != null ? photos.filter(Boolean) : PhotoData.photo,
              // mainphoto: PhotoData.photo,
              // description: description
            })
        }
      }

      async function setLocationData(filteredHashes) {
          let result = [];

          while (filteredHashes.length) {
              let batch = filteredHashes.splice(0,5); // make 3 requests in parallel

              let batchResult = await Promise.all(batch.map(x => {
                  return getLocationData(x);
              }));

              result = result.concat(batchResult);
          }
          return result;
      }

      const locationsData = await setLocationData(filteredHashes);

      if(!locationsData){
        throw new ApiError('LOCATIONS_EMPTY');
      }

      const test = locationsData.filter(Boolean).map((item) => {

        if(item != null){
         return Object.assign(
          {latitude: item.lat}, 
          {longitude: item.lon}, 
          {googleLink: 'https://www.google.com/maps/place/'+ item.address.trim() +'/@'+ item.lat + ',' + item.lon},
          {description: item.description}, //-----> TODO_2 = SET HERE TEXT
          {positiveReviews: Math.floor(Math.random() * 100)}, //-----> TODO_3 = RATING LOGIC ADD
          {negativeReviews: Math.floor(Math.random() * 100)}, //-----> TODO_3 = RATING LOGIC ADD
          {averageBillUSD: Math.floor(Math.random() * 100)}, //-----> TODO_4 = GET FROM GOOGLE/YANDEX/SITE
          {restriction: null},
          {numberOfUsersSelectedThisLocation: item.photo != undefined ? item.photo.length : Math.floor(Math.random() * 100)}, 
          {lastFiveUsersSelectedThisLocation: [ //-----> TODO_4 = GET REAL USER PHOTOS
            'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e15/10986232_792204010864591_1943951351_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=0CefYx0zadQAX8p5bip&oh=fcd26afd66d0b7457361ae7fe17d085e&oe=5EB31E94',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/22708961_137397253576283_1641343055204188160_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=OfmyBIOuIeYAX8nTOit&oh=f1ba466480f93e66485892d710fa4b1a&oe=5EB044C8',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/71024040_130228614600586_7919094803550290139_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=y4DWTigwpR8AX9xvyj4&oh=29a25d5b1ca3fe8e819f568107e605b3&oe=5EAE41D7',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/82093019_2496883707190074_7533803060583622926_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=UPkeN14n8nsAX9UCYqq&oh=9c3fff6fb03b4a5727809198c9f6dacc&oe=5EAF176E',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/88257534_538727656756767_5275621189640973434_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=Dlvjhc4WN0UAX8xjzEK&oh=3d967b5544d0dd27ef0e41119a90294e&oe=5EADCFDB',
          ]},
          {item}) 
        }
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

      const final = results.filter(location => {
        if(location != null){//&& location.item.photo != undefined && location.item.photo.length != 0
          return location
        }else{
          return false
        }
      })

      const finalresult = final[Math.floor(Math.random() * final.length)];

      res.json(final);
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
