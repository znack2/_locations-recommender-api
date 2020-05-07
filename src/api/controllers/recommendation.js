const ApiError = require('../errors/ApiError');
const models = require('../../models');
const sortByDistance = require('sort-by-distance');
// const yandeximages = require("yandex-images");
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const axios = require("axios");
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
      // console.log('console_check_1','userId',userId);

      //2) get data
      const currentLocation = req.query.currentLocation 
        ? req.query.recommendationId 
        : {"lat":54.7501898,"lan":36.795363099999996};
        // : {"lat":55.7501898,"lan":37.795363099999996};

      const categoryId = req.query.recommendationId ? req.query.recommendationId : 5;

      // console.log('console_check_2','currentLocation',currentLocation);
      // console.log('console_check_2','categoryId',categoryId);

      // 3) get preferences
      const preferences = await models.userPreferences.find({ userId }, ['preference'])
        // .then(preferences => await searchTag(preferences));
        .then(preferences => preferences.map(({ preference }) => preference));

      // console.log('console_check_3','preferences',preferences);

      const tags = await searchTags(preferences);
      // console.log('3','tags',tags);
      // console.log('console_check_3','tags.length',tags.length);

      var uniqueLocationIds;

      if(!tags || tags === undefined || tags.length == 0)
      {
        uniqueLocationIds = await getRecomendations('кафе');
        // console.log('console_check_4','uniqueLocationIds',uniqueLocationIds); 
      } 
      else 
      {
        var finallocationIds = [];

        for (var i = tags.length - 1; i >= 0; i--) {
          //4) get ids from personalize
          var locationIds = await getRecomendations(tags[i].HashTag);
          // console.log('console_check_4','locationIds',locationIds); 
          finallocationIds.push(locationIds);
        }
        uniqueLocationIds = [...new Set(finallocationIds.flat())];
      }

      // console.log('5','uniqueLocationIds',uniqueLocationIds); 
      // console.log('console_check_5','uniqueLocationIds.length',uniqueLocationIds.length);

      if(!uniqueLocationIds){
        throw new ApiError('PERSONALIZE_EMPTY');
      }

      //5) get hashtag and type by location_id in location3
      const locationHashes = await searchLocation3(uniqueLocationIds);//types
      // console.log('5','locationHashes',locationHashes);
      // console.log('console_check_6','locationHashes',locationHashes.length);
        // {
        //   id: '100010000410096',
        //   name: 'Л.Кнопа',
        //   hash: ' особняккнопа',
        //   type: ' Музей-усадьба'
        // },

      if(!locationHashes){
        throw new ApiError('LOCATIONS3_EMPTY');
      }

      //6) category
      var categories;

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
          categories = ['музей','кафе','выставка','клуб','кухня','Рок'];
      }

      const filteredHashes = locationHashes.filter(location => {
        if(location.type != null){
          //split by word
          var words = location.type.split(' ').filter(Boolean)
           //check include word in array
          var result = words.map(word => {
            return categories.includes(word)
          })

          // console.log('result_inside',result);

          if(result.includes(true)){
            return location
          }
        }
      });

      // console.log('console_check_7','filteredHashes.length',filteredHashes.length);
      // filteredHashes.map(location => console.log('console_check_7','filteredHashes.each',location.name));
      // console.log('console_check_7','filteredHashes.length',filteredHashes);
      

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
        //7) set locationData

        // console.log('console_check_8','location.name -->',location.name);

        var locationData = await searchLocations(location.name)//categories
        // console.log('console_check_8','locationData.length',locationData.length);

        // console.log('console_check_8','locationData.name',locationData[0].name);
        // console.log('console_check_8','locationData',locationData);
          // {
          //   name: 'Китайский летчик Джао Да',
          //   address: 'Россия, Москва, Лубянский проезд, 25, стр. 1',
          //   website: 'http://www.jao-da.ru/',
          //   phone: '+7 (495) 624-56-11 +7 (495) 623-28-96',
          //   type: 'Кафе Ресторан Ночной клуб',
          //   workhours: 'пн-пт 11:00–6:00, сб,вс 12:00–6:00',
          //   lat: '55.7549148',
          //   lon: '37.634553',
          //   maintag: 'КитайскийлетчикДжаоДа\n'
          // },

        if(locationData.length == 0){
          // console.log('locationData','EMPTY');
          return;
        }
        //8) get posts from location
        var posts = await searchPosts(location.hash);
        // console.log('console_check_9','posts.length',posts.length);
        // console.log('console_check_9','posts',posts);

        // {
        //   display_url: 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/66346490_2930842733652374_2743469691561075586_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=USpS3f5PBuoAX_sGxW1&oh=9cc56fb84b1327a7a3e79c52443b972c&oe=5EC8EB62',
        //   insta_description: 'Ph: @tetyaksusha \n' +
        //     '#девичникмосква #девичникэтодух #девичникподруги #девичникамногонебывает #москва #взаимныеподписки #сладкиймузей🍭 #свадебныйдевичник  #сладкиймузеймосква #sweetmuseum #взаимныелайки #sweet #happy #msk мск #sexy #кола #cocacola #rose #pink #happy #goodday #розовый',
        //   thumbnail_src: 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/66346490_2930842733652374_2743469691561075586_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=USpS3f5PBuoAX_sGxW1&oh=9e12747524a69c1515ccd3b42e51e4d3&oe=5ECBA6C6',
        // }

        if(!posts){
          throw new ApiError('POSTS_EMPTY');
        }

        if(locationData[0] != null){

            //10) get mainphoto from yandex
            async function getMainPhoto (location, callback){

              if(location.website && location.website !== undefined){

                // console.log('location.website',location.website);
                // try {
                  var query = location.website.replace(/(^\w+:|^)\/\//, '');//.slice(0,-1);// + '&iax=images&ia=images';

                  // console.log('console_check_query',query);

                // timeout(50000, )
                  image_search({ query: query, moderate: false }, 2, 1).then(function(result) {
                    if (result && result !== undefined && result[0] !== undefined) {
                        // console.log('duckduckGo ok.');
                        callback({
                          photo:result[0].image, 
                          url:result[0].url
                        })
                    } else {
                         // console.log('duckduckGo error');
                        callback({
                          photo: 'https://img.freepik.com/free-vector/colorful-smooth-gradient-background_97886-980.jpg?size=626&ext=jpg', 
                          url: null
                        })
                    }
                  }).catch(function(error) {
                    // console.log('duckduckGo error',error);
                  })

                    // image_search({ query: query, moderate: false }, 2, 1).then(
                    //   res => {
                    //       console.log('res',res[0]);
                    //       if (res || res !== undefined) {
                    //           console.log('duckduckGo ok.');
                    //           callback({
                    //             photo:res[0].image, 
                    //             url:res[0].url
                    //           })
                    //       } else {
                    //           console.log('duckduckGo error');
                    //       }
                    //   }
                    // ).catch(function(error) {
                    //   console.log('duckduckGo error',error);
                    // });

                  // return result[0].image
              //   } catch (error) {
              //     console.log(error);
              //   }
              }
            };

            //11) filter photos if not exist or repeat
            async function checkResource(post){//const functionName = async post => 
              var photoArray = [];

                  var photo = timeout(10000, fetch(post.display_url, { method: 'HEAD' })).then(function(result) {
                    if (result.ok) {
                        var link = post.display_url.substring(0, post.display_url.indexOf('?'));
                        if(photoArray.includes(link)){
                          // console.log('Image repetition.');  
                        } else {
                          // console.log('Image exists.');
                          photoArray.push(link);
                          return post.display_url
                        }
                    } else {
                        // console.log('Image does not exist.');
                    }
                  }).catch(function(error) {
                    // console.log('error',error);
                  })

                // var photo = fetch(post.display_url, { method: 'HEAD' })
                // .then(res => {
                //     if (res.ok ) {
                //         var link = post.display_url.substring(0, post.display_url.indexOf('?'));
                //         if(photoArray.includes(link)){
                //           console.log('Image repetition.');  
                //         } else {
                //           console.log('Image exists.');
                //           photoArray.push(link);
                //           return post.display_url
                //         }
                //     } else {
                //         console.log('Image does not exist.');
                //     }
                // }).catch(err => console.log('Error:', err));

                return photo
            };

            //12) get description from website
            async function getDescription (link, callback){
              if(!link || link == null){
                // console.log('link',link);
                callback('some text')
              } else {
                // setTimeout(function() 
                // {
                  var { data } = await axios.get(link)

                  var $ = cheerio.load(data,{
                     ignoreWhitespace: true
                   });

                  $desc = $('meta[name="description"]').attr('content')

                  callback($desc);
                // }, 1000)
              }
            };

            const PhotoData = await new Promise(resolve => getMainPhoto(locationData[0], result => resolve(result)))

            // console.log('console_check_10','PhotoData',PhotoData);

            // var filterPhotos = posts => Promise.all(posts.map(checkResource));
            // var photos = await filterPhotos(posts)

            // console.log('console_check_11','photos',photos);

            const description = await new Promise(resolve => getDescription(PhotoData.url, result => resolve(result)))

            // console.log('console_check_12','description',description);

            return Object.assign(locationData[0], {
              // photo: photos.length != null ? photos.filter(Boolean) : PhotoData.photo,
              // photo: await filterPhotos(posts),
              mainphoto: PhotoData.photo,
              description: description
            })
        }
      }






      const setLocationData = filteredHashes => Promise.all(filteredHashes.map(getLocationData));

      const locationsData = await setLocationData(filteredHashes);

      if(!locationsData){
        throw new ApiError('LOCATIONS_EMPTY');
      }

      const middle = locationsData.filter(Boolean);
      // console.log('console_check_13','locationsData',locationsData);
      // middle.map(location => console.log('console_check_13','locationsData.each',location.name));
      // console.log('console_check_13','locationsData.length',middle.length);

      // {
      //   name: 'Ресторан',
      //   address: 'Россия, Москва',
      //   website: '',
      //   phone: '',
      //   type: 'Ресторан',
      //   workhours: '',
      //   lat: '55.755826',
      //   lon: '37.6172999',
      //   maintag: 'Ресторан\n',
      //   photo: [
      //     'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/18096445_681996005336290_7839002746190561280_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=bZAQZgCr_N8AX-vqkEp&oh=50f7ba21dab5340cdd188d057fd2633f&oe=5ECAF8A0',
      //   ]
      // },


      //10) sort by distance  -----> REMOVE AFTER UPLOAD NEW DATA 
      const test = middle.map((item) => {

        if(item != null){
         return Object.assign(
          // id: , -----> TODO_1 = SET SOMETHING
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

      // console.log('console_check_14','results.length',results.length);

      const final = results.filter(location => {
        if(location != null){//&& location.item.photo != undefined && location.item.photo.length != 0
          return location
        }else{
          // console.log('UNDEFINED')
          return false
        }
      })

      // console.log('console_check_15','final.length',final.length);

      const finalresult = final[Math.floor(Math.random() * final.length)];

      res.json(final);
      // res.json(finalresult);
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
