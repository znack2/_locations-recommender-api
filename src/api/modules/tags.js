const config = require('config');
const ApiError = require('../errors/ApiError');
const models = require('../../models');
const { getRecomendations } = require('../../services/personalizeService');

const { 
  searchTags,
  searchLocation3,
} = require('../../services/elasticService');

const categories = [];

//горы

// 'Общение
// Прогулки
// Пляж
// instagram
// подкасты
// огород

// церемония
// блоги

// Моделирование
// Оригами
// Пикап
// Программирование
// пирсинг
// радио
// Винил


// Сочинение
// Игрушки
// куклы

//кино
//tv'

const random = [
  //random
  'ресторан','парк','театр','музей','клуб','десерт','культура','спорт'
  // 'Пилатес','фитнес','fintes','зож', 'Массаж','релакс','спа', 'вело','Ролики','Коньки', 
  // 'Паркур', 'Рыбалка', 'Дартс', 'Бильярд', 'Боулинг', 'Пейнтбол', 'Ролевые игры', 'животные', 'кошки', 'собаки',
  // 'Шитье','Резьба','Иностранные языки', 'английский', 'французкий', 'испанский', 'итальянский','englsih',
]

categories[1] = {
  //Быстрое питание
  'ресторан':['кухня','есть','еда','eat','ресторан','кафе','wifi','дегустация','готовка','кулинария'],
  'фастфуд':['кола', 'спрайт', 'пепси', 'чипсы', 'фри', 'McDonald', 'мак', 'King', 'pepsi', 'cola', 'cocacola', 'coca-cola','sprite','fanta','пиццерия','пицца','pizza','Быстрое питание','фастфуд','шаурма'],
  'кофе':['кофе','кофейня','starbucks','капучино', 'cappuccino', 'латте', 'завтраки', 'coffee', 'cafe', 'americano', 'espresso', 'mocha', 'arabica', 'frappe', 'лавацца', 'lavazza', 'бариста','старбакс','капуч', 'капичинно'],
  'пиво':['пиво', 'разливное', 'выпить','ale','эль','heineken','ипа','ipa','guinness','lager','pilsner','stella','draft', 'сидер', 'cider', 'beer', 'bar', 'pub'],
  'вино':['prosecco','champagne','sauvignon','merlot','chardonnay','moscato','просекко', 'мерло', 'шардоне','chianti','wine','вино','шампанское'],
  'стейк':['стейк', 'говядина', 'свинина', 'курица', 'шашлык', 'баранина', 'burgers', 'бургеры', 'meat', 'мясо','шашлик','бургеры','burger','борщ','хачапури'],
  'рыбный ресторан':['морепродукты', 'краб', 'рак', 'креветки', 'устрицы', 'икра', 'рыба', 'sushi', 'суши', 'fish'],
  'веган':['веган', 'вегетариан','vegetarian', 'diet', 'vegan', 'виган'],
  'десерт':['cheesecake', 'торт', 'чизкейк', 'панакота', 'выпечка', 'сладости', 'маскарпоне', 'пирожное', 'десерт', 'чискейк']
}
//listen
categories[2] = {
  //stay
  'клуб':['ночной', 'дискотек', 'коктели', 'бухло', 'party', 'club', 'вечеринк', 'баб', 'пат','клуб','sex','секс'],
  'караоке':['пение', 'вокал', 'karaoke', 'караоке'],
  // sit
  'концерт':['шоу', 'opera', 'концерт', 'выступление', 'оркестр','рок','панк','rock','концертный зал','concert','чайковский'],
  'живаямузыка':['живая музыка','музыканты','джаз','livemusic','музыка','гитара']
}
//see
categories[3] = {
  //inside
  // 'all':['сериал', 'Диггерство' ,'Робототехника' ,'Татуировки' ,'Фокусы' ,'антиквариат' ,'реконструкция'],
  'выставка':['галерея', 'третьяковка', 'выставка', 'gallery','aнтикварный','рисовать','дизайн','Живопись','рисование','графика'],
  // graffiti:['photo', 'video', 'graffiti', 'графити', 'граффити' ],
  'мода':['одежда', 'стиль', 'мода', 'фэшн', 'модельеры', 'красота', 'образ', 'fasion', 'магазин', 'тц' , 'центр'],
  //outside
  'парк':['зарядье', 'вднх', 'музеон', 'park', 'парк','гулять'],
  'смотровая':['point', 'смотровая', 'обзорная', 'observe'],
  'достопримечательности':['достопримечательности', 'культура', 'landmark'],
  'культура':['готика', 'храмы', 'церкви', 'история', 'классика', 'модерн', 'архитектура'],
  'памятник':['скульптуры', 'монументы', 'статуи', 'памятник', 'monuments'],
  //by hand
  'мастеркласс':['семинар', 'лекция','мастер-класс','masterclass','мастеркласс','курсы','стартап','Тренинги','каллиграфия'],
  // 'мастеркласс2':['Шитье','Резьба'],
  // 'мастеркласс3':['Иностранные языки', 'английский', 'французкий', 'испанский', 'итальянский','englsih'], //by others
    //.emotion laugh
  // standup:['стендап', 'юмор', 'смех', 'поржать'],
    //emotion sex
  // strip:['бабы', 'стрип', 'девки', 'телки', 'секс' ],
    // emotion cry
  'театр':['театр', 'спектакли','шекспир','гамлет','отелло','пушкин']
}
//think
categories[4] = {
  'квест':['quiz', 'квиз', 'квест', 'головоломка', '60', 'чтогдекогда', 'викторина','Головоломки'],
  // board:['настольная', 'игра', 'нарды', 'карты', 'активити', 'слова', 'эрудит', 'монополия', 'мафия', 'civilization', 'alias', 'свинтус', 'шахматы', 'настолка','шашки','Нарды','покер','шахматы','Паззлы' ], 
  // technology: ['ит', 'it', 'ml', 'ar', 'vr','блокчейн','blockchain' ],
  // business: ['бизнес', 'business','коворкинг','Предпринимательство'],
  'библиотека': ['medicine', 'медицина', 'исследования', 'наука','библиотека','чтение','книги'],
  //art/history
  // exhibition: ['exhibition', 'экскурсии'],
  'музей': ['музей', 'museum'],
  //mental
  // spiritual: ['psycho', 'психология', 'социология', 'медитация','Йога'],
  // charity: ['благотворительность','пожертвования']
}
//activity
categories[5] = {
  'спорт':['футбол', 'теннис','хоккей', 'баскетбол','спорт','sport','плавать','лыжи','горные лыжи','сноуборд','бег','Аэробика','Серфинг'],
  'танцы':['хореография','сальса','dance','данс','танцы','балет'],
  'дети':['игровая', 'площадка', 'playground', 'детская', 'комплекс', 'городок','дети','ребенок','развлекательный','аттракцион','играть','Лазертаг'],
  'гонки':['driving', 'car', 'машина', 'мото', 'авто','вождение','картинг','гонки','стритрейсинг','carting','Автомобили'],
  // 'фитнес':['Пилатес','фитнес','fintes','зож'],
  // 'релакс':['Массаж','релакс','спа'],
  // 'вело':['вело','Ролики','Коньки'],
  // 'all':['Паркур', 'Рыбалка', 'Дартс', 'Бильярд', 'Боулинг', 'Пейнтбол', 'Ролевые игры'], 
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

async function ElasticTags(){

      // if(preferences.length == 0){
      //   var object = categories[categoryId]
      //   preferences.push(Object.keys(object)[0]);
      // }    

      // const preferences = await models.userPreferences.find({ userId }, ['preference'])
      //   .then(preferences => preferences.map(({ preference }) => preference));

      // const selected = preferences.filter(tag) => {
          
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
}


async function getHashes (userId, categoryId){

    console.log('getHashes','userId',userId)
    console.log('getHashes','categoryId',categoryId)
    
    //2) find tag in every categories but filter if only categoryId exist!
    function checkExistTag(preference) {
      var res;

      //go through each categories and search by tag
      for (var i = categories.length - 1; i >= 1; i--) {
        var object = categories[i]
        res = Object.keys(object).find(key => object[key].includes(preference.toLowerCase()));
        //if find 
        if(res != undefined){
          console.log('checkExistTag',res)
          return res
        } 
      }
    }

    var result;
    
    //1) get from db tags 
    result = await models.userPreferences.find({ userId }, ['preference'])
      .then(preferences => preferences.map(({ preference }) => checkExistTag(preference)).filter(Boolean));

    // console.log('result',result)


    //3) if not found any tag
    function randCol(arr) {
      var colArr = [];
      for (var i = 0; i < 3; i++) {
       //get only ONE random element
        var rand = arr[Math.floor(Math.random() * arr.length)];
        if(rand != null && !colArr.includes(rand)){
          colArr.push(rand);
        }
      }
      return colArr;
    }

    console.log('check if not found',result)
    
    if(result.length == 0){
      result = randCol(random);
      categoryId = '0';
      console.log('result if nothing',result)
    }




    //3) if any tags not found 
    // for (var i = result.length - 1; i >= 0; i--) {
    //   if(result[i] == undefined)
    //   {
    //     var exist = result[i]
    //   }
    // }

    // if(exist){
    //   var id = categoryId ? categoryId : 5;
    //   var object = categories[id]
    //   result = [Object.keys(object)[0]]
    //   console.log('result if nothing',result)
    // }






    //4) filter if some not found
    const finaltags = result.filter(Boolean); 





    //5) filter duplicates
    function remove_duplicates_es6(arr) {
        let s = new Set(arr);
        let it = s.values();
        return Array.from(it);
    } 

    const output_data = []

    output_data['tags'] = remove_duplicates_es6(finaltags)





    //6) find tag in every categories but filter if only categoryId exist!
    function findCategoryId(tag) {
      //go through each categories and search by tag
      for (var i = categories.length - 1; i >= 1; i--) {
        // res = Object.keys(categories[i]).find(key => categories[i][key].includes(tag));
        //if find 
        if(categories[i][tag] != undefined){
          return i
        }
      }
    }

    //set categoryId
    if(!categoryId || categoryId == undefined){
      console.log('data_tags',output_data['tags'])
      console.log('categoryId',categoryId)
      const categoriesArray = output_data['tags'].map(tag => findCategoryId(tag))
      //find only one most common category
      const findCommon = (myArray) =>
        myArray.reduce((a,b,i,arr)=>(arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),null)

      output_data['categoryId'] = findCommon(categoriesArray)
    } else {
      output_data['categoryId'] = categoryId
    }

    console.log('getHashes','output_data',output_data)

    //output
    return output_data;
}

module.exports = {
  getHashes
}






