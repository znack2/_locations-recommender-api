const config = require('config');
const ApiError = require('../errors/ApiError');
const models = require('../../models');
const { getRecomendations } = require('../../services/personalizeService');

const { 
  searchTags,
  searchLocation3,
} = require('../../services/elasticService');

const categories = [];


//  кухня'
//  есть 

//eat
categories[1] = {
  //Быстрое питание
  'фастфуд':['кола', 'спрайт', 'пепси', 'чипсы', 'фри', 'McDonald', 'мак', 'King', 'pepsi', 'cola', 'cocacola', 'coca-cola','sprite','fanta','пиццерия','пицца','pizza','Быстрое питание','фастфуд'],
  'кофе':['кофе','кафе','кофейня','starbucks','капучино', 'cappuccino', 'латте', 'завтраки', 'coffee', 'cafe', 'americano', 'espresso', 'mocha', 'arabica', 'frappe', 'лавацца', 'lavazza', 'бариста','старбакс','капуч', 'капичинно'],
  'пиво':['пиво', 'разливное', 'выпить','ale','эль','heineken','ипа','ipa','guinness','lager','pilsner','stella','draft', 'сидер', 'cider', 'beer', 'bar', 'pub'],
  'вино':['prosecco','champagne','sauvignon','merlot','chardonnay','moscato','просекко', 'мерло', 'шардоне','chianti','wine','вино','шампанское'],
  'стейк':['стейк', 'говядина', 'свинина', 'курица', 'шашлык', 'баранина', 'burgers', 'бургеры', 'meat', 'мясо','шашлик'],
  'рыбный ресторан':['морепродукты', 'краб', 'рак', 'креветки', 'устрицы', 'икра', 'рыба', 'sushi', 'суши', 'fish'],
  'веган':['веган', 'вегетариан','vegetarian', 'diet', 'vegan', 'виган'],
  'десерт':['cheesecake', 'торт', 'чизкейк', 'панакота', 'выпечка', 'сладости', 'маскарпоне', 'пирожное', 'десерт', 'чискейк']
}
//listen
categories[2] = {
  //stay
  'клуб':['ночн', 'дискотек', 'коктели', 'бухло', 'party', 'club', 'вечеринк', 'баб', 'пат','клуб'],
  'караоке':['пение', 'вокал', 'karaoke', 'караоке'],
  // sit
  'концерт':['шоу', 'opera', 'концерт', 'выступление', 'оркестр','рок','панк','rock','Концертный зал','concert'],
  'живаямузыка':['живая музыка', 'музыканты','джаз','livemusic','музыка']
}
//see
categories[3] = {
  //inside
  'выставка':['галерея', 'третьяковка', 'выставка', 'gallery','aнтикварный','рисовать'],
  // graffiti:['photo', 'video', 'graffiti', 'графити', 'граффити' ],
  'мода':['одежда', 'стиль', 'мода', 'фэшн', 'модельеры', 'красота', 'образ', 'fasion', 'магазин', 'тц' , 'центр'],
  //outside
  'парк':['зарядье', 'вднх', 'музеон', 'park', 'парк','гулять'],
  'смотровая':['point', 'смотровая', 'обзорная', 'observe'],
  'достопримечательности':['достопримечательности', 'культура', 'landmark'],
  'культура':['готика', 'храмы', 'церкви', 'история', 'классика', 'модерн', 'архитектура'],
  'памятник':['скульптуры', 'монументы', 'статуи', 'памятник', 'monuments'],
  //by hand
  'мастеркласс':['семинар', 'лекция','мастер-класс','masterclass','мастеркласс','курсы' ],
  //by others
    //.emotion laugh
  // standup:['стендап', 'юмор', 'смех', 'поржать'],
    //emotion sex
  // strip:['бабы', 'стрип', 'девки', 'телки', 'секс' ],
    // emotion cry
  'театр':['театр', 'спектакли' ]
}
//think
categories[4] = {
  'квест':['quiz', 'квиз', 'квест', 'головоломка', '60', 'чтогдекогда', 'викторина'],
  // board:['настольная', 'игра', 'нарды', 'карты', 'активити', 'слова', 'эрудит', 'монополия', 'мафия', 'civilization', 'alias', 'свинтус', 'шахматы', 'настолка' ], 
  // technology: ['ит', 'it', 'ml', 'ar', 'vr','блокчейн','blockchain' ],
  // business: ['бизнес', 'business','коворкинг'],
  'библиотека': ['medicine', 'медицина', 'исследования', 'наука','библиотека','чтение','книги'],
  //art/history
  // exhibition: ['exhibition', 'экскурсии'],
  'музей': ['музей', 'museum'],
  //mental
  // spiritual: ['psycho', 'психология', 'социология', 'медитация'],
  // charity: ['благотворительность','пожертвования']
}
//activity
categories[5] = {
  'спорт':['футбол', 'хоккей', 'баскетбол','спорт','sport','плавать'],
  'танцы':['хореография','сальса','dance','данс','танцы'],
  'дети':['игровая', 'площадка', 'playground', 'детская', 'комплекс', 'городок','дети','ребенок','развлекательный','аттракцион','играть'],
  'гонки':['driving', 'car', 'машина', 'мото', 'авто','вождение','картинг','гонки','стритрейсинг','carting'],
  // animals:['животные', 'кошки', 'собаки']
}

const types = [
  'антикафе',
  'арт-кафе',
  'банкетный зал',
  'бар',
  'бистро',
  'бургерная',
  'блинная',
  'винотека',
  'гастробар',
  'дворец',
  'детское кафе', 
  'кальянная',
  'кафе',
  'кейтеринг',
  'клуб',
  'кондитерская',
  'корабль',
  'кофейня',
  'кулинарная студия', 
  'лаунж',
  'паб',
  'пекарня',
  'пиццерия',
  'премиум-ресторан',
  'ресторан',
  'ресторанный комплекс', 
  'рюмочная',
  'семейный ресторан', 
  'столовая', 
  'стейк-хаус',
  'шашлычная',

  'парк',
  'концертный зал',
  'театр',
  'стадион',
  'музей',
  'галерея',
  'магазин',
  'храм',
  'церковь',
  'памятник',
]


async function getFromPersonalize (tags) 
{
    //get recommendation personalize
    if(!tags || tags === undefined || tags.length == 0)
    {
      //if not found tags get random tags
      return await getRecomendations('кафе');
    } 
    else 
    {
      var finallocationIds = [];

      for (var i = tags.length - 1; i >= 0; i--) {
        var locationIds = await getRecomendations(tags[i].HashTag);
        finallocationIds.push(locationIds);
      }
      return [...new Set(finallocationIds.flat())];
    }
}

async function getHashes (userId, categoryId){

      //find tag in every categories but filter if only categoryId exist!
      function checkExistTag(preference) {
        var res;

        //go through each categories and search by tag
        for (var i = categories.length - 1; i >= 1; i--) {
          var object = categories[i]
          res = Object.keys(object).find(key => object[key].includes(preference));
          //if find 
          if(res != undefined){
            console.log('checkExistTag',res)
            return res
          }
        }
      }

      var result;
      
      //get from db tags 
      result = await models.userPreferences.find({ userId }, ['preference'])
        .then(preferences => preferences.map(({ preference }) => checkExistTag(preference)));

      //if nothing found get first maintag from categories
      if(result == undefined || result == null){
        var id = categoryId ? categoryId : 5;
        var object = categories[id]
        result = [Object.keys(object)[0]]
        console.log('result2',result)
      }

      //filter if some not found
      const finaltags = result.filter(Boolean); 

      //filter duplicates
      function remove_duplicates_es6(arr) {
          let s = new Set(arr);
          let it = s.values();
          return Array.from(it);
      } 

      const data = []

      data['tags'] = remove_duplicates_es6(finaltags)

      //find tag in every categories but filter if only categoryId exist!
      function findCategoryId(tag) {
        var res;

        //go through each categories and search by tag
        for (var i = categories.length - 1; i >= 1; i--) {
          var object = categories[i]
          res = Object.keys(object).find(key => object[key].includes(tag));
          //if find 
          if(res != undefined){
            console.log('findcategoryId',res)
            return i
          }
        }
      }

      if(!categoryId){
        const categoriesArray = data['tags'].map(tag => findCategoryId(tag))
        //find only one most common category
        const findCommon = (myArray) =>
          myArray.reduce((a,b,i,arr)=>(arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),null)

        data['categoryId'] = findCommon(categoriesArray)
      } else {
        data['categoryId'] = categoryId
      }
      

      // if(preferences.length == 0){
      //   var object = categories[categoryId]
      //   preferences.push(Object.keys(object)[0]);

      //   console.log(preferences)
      // }    

      // const preferences = await models.userPreferences.find({ userId }, ['preference'])
      //   .then(preferences => preferences.map(({ preference }) => preference));

      // const selected = preferences.filter(tag) => {
          

      //     switch (tag) {
      //       case '1':
      //        categories = [];//думать
      //         break;
      //       case '2':
      //        categories = [];//слушать
      //         break;
      //       case '3':
      //        categories = [];//еда
      //         break;
      //       case '4':
      //        categories = []; //смотреть
      //         break;
      //       default:
      //         categories = []; //random
      //   }
      // }


      //find in elastic
      // const tags = await searchTags(preferences);

      // const uniqueLocationIds = await getFromPersonalize(tags);

      // if(!uniqueLocationIds){
      //   throw new ApiError('PERSONALIZE_EMPTY');
      // }

      //get from elastic by id
      // const locationHashes = await searchLocation3(uniqueLocationIds);

      // if(!locationHashes){
      //   throw new ApiError('LOCATIONS3_EMPTY');
      // }

      //afterfilter by 
      // var categories;
      // switch (categoryId) {
      //   case '1':
      //    categories = [];//думать
      //     break;
      //   case '2':
      //    categories = [];//слушать
      //     break;
      //   case '3':
      //    categories = [];//еда
      //     break;
      //   case '4':
      //    categories = []; //смотреть
      //     break;
      //   default:
      //     categories = []; //random
      // }

      // const filteredHashes = locationHashes.filter(location => {
      //   if(location.type != null){
      //     var words = location.type.split(' ').filter(Boolean)
      //     var result = words.map(word => {
      //       return categories.includes(word)
      //     })

      //     if(result.includes(true)){
      //       return location
      //     }
      //   }
      // });

      //output
      return data;
}

module.exports = {
  getHashes
}






