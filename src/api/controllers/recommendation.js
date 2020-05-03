const ApiError = require('../errors/ApiError');
const models = require('../../models');
const sortByDistance = require('sort-by-distance');
const yandeximages = require("yandex-images");

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

      // const preference = 'клуб';

      console.log('3','preferences',preferences);

      // if(!preferences){
      //   preferences = [''];
      // } 

      const tags = await searchTags(preferences);
      console.log('3','tags',tags);

      var finallocationIds;

      if(!tags || tags == null){
        throw new ApiError('TAG_NOT_FOUND');
        finallocationIds = await getRecomendations(['кафе']);
        // console.log('4','locationIds',locationIds); 
      } else {
        // for (var i = tags.length - 1; i >= 0; i--) {
        //   //4) get ids from personalize
        //   const locationIds[] = await getRecomendations(tags[i].HashTag);
        //   // console.log('4','locationIds',locationIds); 
        // }

        // //5) find similar locationIDs
        // function compareArr(arrList){
        //   var S = '@' + arrList.join('@');
        //   var re = /(@[^@]+)(@.*)?(\1)(@|$)/gi
        //   var afterReplace=''; var i=0;
        //   while(afterReplace!=S && i<100){
        //       afterReplace=S;
        //       S = S.replace( re, "$1$2$4" )
        //       i++
        //   }

        //   return S.substr(1,S.length-1).replace(/@/g,'<br>')
        // }

        // const finallocationIds = compareArr(locationIds);

        finallocationIds = await getRecomendations(tags[0].HashTag);
      }


      if(!finallocationIds){
        throw new ApiError('PERSONALIZE_EMPTY');
      }

      //5) get hashtag and type by location_id in location3
      const locationHashes = await searchLocation3(finallocationIds);//types
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
        async function callshift(name){
          const result = await new Promise(resolve => 
            yandeximages.Search(
              name, 
              false, 
              url => resolve(url)
            ));
          return result
        }

        const image = await callshift(location.name);
        // console.log('9','image',image);

        if(locations[0] != null){
            return Object.assign(locations[0], {
              photo:  posts.map(post => post.display_url),
              mainPhoto: image
            })
        }
      }

      const setLocationData = filteredHashes => Promise.all(filteredHashes.map(getLocationData));

      const locationsData = await setLocationData(filteredHashes);

      if(!locationsData){
        throw new ApiError('LOCATIONS_EMPTY');
      }

      // console.log('10','locationsData',locationsData);

      //10) sort by distance  -----> REMOVE AFTER UPLOAD NEW DATA 
      const test = locationsData.map((item) => {

        if(item != null){
         return Object.assign(
          // id: ,
          {latitude: item.location.lat}, 
          {longitude: item.location.lon}, 
          {googleLink: 'https://www.google.com/maps/place/'+ item.address.trim() +'/@'+ item.location.lat + ',' + item.location.lon},
          {description: 'text'}, //-----> SET HERE TEXT
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
        results = sortByDistance(currentLocation, test, opts);
      }else{
        results = test
      }

      // console.log('11','results',results);

      const final = test.filter(result => {
        if(result != null){
          return result
        }else{
          console.log('UNDEFINED')
        }
      })

      console.log('12','length',results.length);

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
