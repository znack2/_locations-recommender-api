const ApiError = require('../errors/ApiError');
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

const { getHashes } = require('../modules/tags');
const { getPosts } = require('../modules/posts');

// const { getUserPreferences } = require('../../controllers/user');

const { 
  // searchLocations,
  searchLocations4
} = require('../../services/elasticService');


module.exports = {
  getRecommendation: async (req, res, next) => {
    try {
      const { userId } = req.session;//categoryId

      // console.log('req.query.currentLocation',req.query.currentLocation != undefined)

      const currentLocation = req.query.currentLocation != undefined 
        ? req.query.currentLocation 
        : {"lat":55.761429,"lan":37.601048};
        // : {"lat":54.7501898,"lan":36.795363099999996};

      console.log('currentLocation',currentLocation)

      const categoryId = req.query.recommendationId;

      console.log('categoryId',categoryId)

      const filteredHashes = await getHashes(userId,categoryId);

      // console.log('filteredHashes',filteredHashes)

      var finalresult = []

      if(filteredHashes.length != null && filteredHashes['tags'][0] != undefined){
  
          // function timeout(ms, promise) {
          //   return new Promise(function(resolve, reject) {
          //     setTimeout(function() {
          //       reject(new Error("timeout"))
          //       // console.log('timeout');
          //     }, ms)
          //     promise.then(resolve, reject)
          //   })
          // }

          const getLocationData = async (selectedTag,categoryId) => {
           // const getLocationData = async location => {

            //new
            // return await searchLocations4(selectedTag,categoryId)
            var locationData = await searchLocations4(selectedTag,categoryId)

            console.log('locationData.length',locationData.length)
            //old
            // var locationData = await searchLocations(location.name)//categories

            // console.log('inside','locationData.length',locationData.length);

            // if(locationData.length == 0){
            //   return;
            // }

            //old
            // var posts = await searchPosts(location.hash);

            // if(!posts){
            //   throw new ApiError('POSTS_EMPTY');
            // }

            // if(locationData[0] != null){

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

                const result = []

                for (var i = locationData.length - 1; i >= 0; i--) {

                  var postsData = await new Promise(resolve => getPosts(locationData[i], result => resolve(result)))

                  result.push(Object.assign(locationData[i], {
                    mainphoto: locationData[i].img,
                    // photo: [
                    //   'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/67451683_1162223687313525_9073398506671709435_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Scb_MV4TUHoAX-GSCkD&oh=d8c6f3e221e8fa94129461d871bbc958&oe=5EC97B45',
                    //   'https://scontent-frt3-1.cdninstagram.com/v/t51.2815-15/sh0.08/e35/c0.180.1440.1440a/s640x640/67451683_1162223687313525_9073398506671709435_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Scb_MV4TUHoAX-GSCkD&oh=d8c6f3e221e8fa94129461d871bbc958&oe=5EC97B45'
                    // ],
                    // photo: photos.length != null ? photos.filter(Boolean) : PhotoData.photo,
                    posts: postsData
                    // photo: posts.length != null ? posts.filter(post => !post.insta_description.includes('доктор')).map(post => post.display_url) : PhotoData.photo,
                    // mainphoto: PhotoData.photo,
                    // description: description
                  }))
                }

                console.log('result.length',result.length)

                return result

                // console.log('result',result)
                // console.log('--------------')
                // console.log(die)
            // }
          }

          // DEVIDE INTO CHUNKS
          // async function setLocationData(filteredHashes) {
          //     let result = [];
          //     while (filteredHashes.length) {
          //         let batch = filteredHashes.splice(0,5); // make 3 requests in parallel
          //         let batchResult = await Promise.all(batch.map(x => {
          //             return getLocationData(x);
          //         }));
          //         result = result.concat(batchResult);
          //     }
          //     return result;
          // }

          const setLocationData = (tags,categoryId) => Promise.all(tags.map(tag => getLocationData(tag,categoryId)));

          const locationsData = await setLocationData(filteredHashes['tags'],filteredHashes['categoryId']);

          const flatArray = locationsData.flat();

          console.log('flatArray.length',flatArray.length);
          // console.log('locationsData',locationsData);
          console.log('----------------');

          if(!flatArray){
            throw new ApiError('LOCATIONS_EMPTY');
          }

          // console.log('flatArray',flatArray);

          //format return data
          const test = flatArray.filter(Boolean).map((item) => {
            if(item != null){
             return Object.assign(
              {userRate:false},//-----> TODO_1 = USER RATING 
              {userValue:1},
              {categoryId: parseInt(filteredHashes['categoryId'])},
              {tags: filteredHashes['tags']},
              {latitude: item.lat}, 
              {longitude: item.lon}, 
              {googleLink: 'https://www.google.com/maps/place/'+ item.address.trim() +'/@'+ item.lat + ',' + item.lon},
              {description: item.description}, 
              {positiveReviews: Math.floor(Math.random() * 100)}, //-----> TODO_3 = RATING LOGIC ADD
              {negativeReviews: Math.floor(Math.random() * 100)}, //-----> TODO_3 = RATING LOGIC ADD
              {averageBillUSD: Math.floor(Math.random() * 100)}, //-----> TODO_4 = GET FROM GOOGLE/YANDEX/SITE
              {restriction: null}, //-----> TODO_5 = GET FROM GOOGLE/YANDEX/SITE
              {numberOfUsersSelectedThisLocation: item.photo != undefined ? item.photo.length : Math.floor(Math.random() * (Math.floor(30) - Math.ceil(5)) + Math.ceil(5))}, 
              {lastFiveUsersSelectedThisLocation: [ //-----> TODO_6 = GET REAL USER PHOTOS
                'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-19/s150x150/95779124_2630482867272359_5467394879912935424_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_ohc=tOnpI8Z1V1wAX-arPmu&oh=7cc6c7a0d6227aba18a4e1b839aa7fe8&oe=5EDECD91',
                'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-19/s150x150/95749296_2481761685399011_1388421669617401856_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_ohc=NKqxKjvWd_MAX8h1t8Z&oh=c628d5f8db79c41a37e47f2b42160b9c&oe=5EDEB129',
                'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-19/s150x150/95316087_234854747800077_8831435638071885824_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_ohc=UUEYYW-exL8AX_vjWAX&oh=fbb276ed635b4255c5c8ec517a782ec2&oe=5EDF1538',
                'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-19/s150x150/59867561_370763203559266_6276927744840302592_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_ohc=jyJaft6ZXw0AX-Mwcai&oh=4445d5facea3d55d2181530e569bff7e&oe=5EDF5BD6',
                'https://scontent-hel2-1.cdninstagram.com/v/t51.2885-19/s150x150/91022540_633085187539391_3943624432722903040_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_ohc=uUdoeOlrjcAAX_uYaS7&oh=2b8ca75c4022b1f2632aba7254b6df84&oe=5EDCACFE',
              ]},
              {item}) 
            }
          })

          console.log('test.length',test.length);

          // function checkTime(workhours){
          //   // пн-пт 11:00–18:30
          //   //пн-чт 10:00–22:00, пт-вс 10:00–23:00
            
          //   if(workhours != null){
          //     //get current time
          //     //get timeframe from 

          //     var time = [...workhours.matchAll('([0-1]?[0-9]|2[0-3]):[0-5][0-9]')];

          //     for (var i = time.length - 1; i >= 0; i--) {
          //       res = new Date(time[i]) > new Date()
          //     }
              
          //     return false;
          //   }
          //   return true;
          // }

          var storage = []

          //filter if empty
          const final = test.filter(location => {

            // const open = checkTime(location.item.workhours)

            // console.log('storage_contain',storage.includes(location.item.name));
            // console.log('storage_contain',location.item.name);

            const already = storage.includes(location.item.name)

            const badPlaces = ['Mandarin','Акапелла','Ресторан-караоке Vintaж77','Music Point',"G'arbuz",'Караоке-бар Song','Суперия']

            const stop = badPlaces.includes(location.item.name)

            // || open && location.item.photo != undefined && location.item.photo.length != 0 && 
            if(location != null && already === false && stop === false){
              // console.log('storage_before',storage.length);
              storage.push(location.item.name)
              // console.log('storage_after',storage.length);
              return location
            }else{
              return false
            }
          })

          console.log('final.length',final.length);

          //random
          function randCol(final) {
            var colArr = [];
            for (var i = 0; i < 6; i++) {
             //get only ONE random element
              var rand = final[Math.floor(Math.random() * final.length)];
              if(rand != null && !colArr.includes(rand)){
                // console.log('rand',rand);
                colArr.push(rand);
              }
            }
            return colArr;
          }

          const result = randCol(final);

          // console.log('result',result);

          //distance
          const opts = {
            yName: 'latitude',
            xName: 'longitude'
          }

          var finalresult

          if(currentLocation != null && result != null){

            // result.map(element => console.log('before_sortByDistance',element.item.name))
            finalresult = sortByDistance(currentLocation, result, opts)
            // finalresult.map(element => console.log('after_sortByDistance',element.item.name))

          }else{
            finalresult = result
          }

          console.log('finalresult.length',finalresult.length);

          res.json(finalresult);
      } 
      else {
        console.log('empty')
        res.json(finalresult);
      }
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
