process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "https://ec2-18-184-212-150.eu-central-1.compute.amazonaws.com:9200",
  auth: {
    username: "elastic",
    password: "l0StiazaR56sexV3uqOw",
  },
});

// async function search(locationIds = []) {
//   const conditions = locationIds.map((id) => ({
//     match: {
//       "location.id": id,
//     },
//   }));

//   const { body } = await client.search(
//     {
//       index: "insta_data-*",
//       body: {
//         query: {
//           bool: {
//             should: conditions,
//           },
//         },
//       },
//     },
//     { ignore: [404] }
//   );
//   return body.hits.hits.map(({_source}) => _source);
// }


//get hashtag and type by location_id in location3
async function searchLocation3(locationIds = []) {//categories
  const conditions = locationIds.map((id) => ({
    match: {
      // "location.id": id,
      "id": id,
    },
  }));  

  const { body } = await client.search(
    {
      index: "locations3",
      // index: "insta_data-*",
      body: {
        from:0,
        size:100,
        query: {
          bool: {
            should: conditions,
          },
        },
      },
    },
    { ignore: [404] }
  );
    //   {
    //   id: '100010000410096',
    //   name: 'Л.Кнопа',
    //   hash: ' особняккнопа',
    //   type: ' Музей-усадьба'
    // },
  
  // console.log('search',body);
  return body.hits.hits.map(({_source}) => _source);
}

async function searchTags(tags = []) {
  const conditions = tags.map((tag) => ({
    match: {
      "HashTag": tag,
    },
  }));

  const { body } = await client.search(
    {
      index: "tags",
        body: {
          query: {
            bool: {
              should: conditions
            },
          },
          // fields: ["_id"]
       },
    },
    { ignore: [404] }
  );
  // console.log(body);
  return body.hits.hits.map(({_source}) => _source);
}

// search by hashtag in insta-data-*
async function searchPosts(maintags) {

  const conditions = maintags.map((tag) => ({
    match: {
      "insta_description": tag,
    },
  }));  
  
  // console.log('searchPosts',maintags);

  const { body } = await client.search(
    {
      index: "insta_data-*",
        body: {
          _source: ["insta_description", "thumbnail_src", "display_url"],
          from:0,
          size:10,
          query: {
            bool: {
              should: conditions
            },
          },
         //  "query":{  
         //    "query_string":{ 
         //        // "default_field":"Customer", 
         //       "fields":[  
         //          "insta_description"
         //       ],
         //       "query": conditions
         //    }
         // }
       },
    },
    { ignore: [404] }
  );

        // {
        //   comments_disabled: false,
        //   location: {
        //     slug: 'sweet-museum',
        //     id: '481634818906206',
        //     has_public_page: true,
        //     name: 'Sweet Museum'
        //   },
        //   did_report_as_spam: false,
        //   viewer_has_liked: false,
        //   edge_media_preview_like: { count: 60 },
        //   fact_check_information: null,
        //   edge_media_to_comment: { count: 0 },
        //   is_video: false,
        //   accessibility_caption: 'Photo by ✨ 𝓘𝓻𝓮𝓷𝓪 𝓣𝓻𝓲𝓼𝓱 ✨ in Sweet Museum. Image may contain: one or more people',
        //   owner: { username: 'irena_trish', id: '461076609' },
        //   display_url: 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/66346490_2930842733652374_2743469691561075586_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=USpS3f5PBuoAX_sGxW1&oh=9cc56fb84b1327a7a3e79c52443b972c&oe=5EC8EB62',
        //   edge_liked_by: { count: 60 },
        //   gating_info: null,
        //   '@version': '1',
        //   dimensions: { height: 1350, width: 1080 },
        //   edge_media_to_caption: {},
        //   text: '',
        //   fact_check_overall_rating: null,
        //   media_preview: '',
        //   shortcode: 'B02jZPfH5LB',
        //   __typename: 'GraphImage',
        //   created_at: 0,
        //   id: '2105025542085382849',
        //   '@timestamp': '2020-04-22T18:57:33.896Z',
        //   insta_description: 'Ph: @tetyaksusha \n' +
        //     '#девичникмосква #девичникэтодух #девичникподруги #девичникамногонебывает #москва #взаимныеподписки #сладкиймузей🍭 #свадебныйдевичник  #сладкиймузеймосква #sweetmuseum #взаимныелайки #sweet #happy #msk мск #sexy #кола #cocacola #rose #pink #happy #goodday #розовый',
        //   taken_at_timestamp: 1565158621,
        //   thumbnail_src: 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/66346490_2930842733652374_2743469691561075586_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=USpS3f5PBuoAX_sGxW1&oh=9e12747524a69c1515ccd3b42e51e4d3&oe=5ECBA6C6',
        //   is_restricted_pending: false
        // }

  // console.log('search',body);
  return body.hits.hits.map(({_source}) => _source);
}

//get location info by hashtag in location2
async function searchLocations(name) //categories
{
  // const conditions = categories.map((category) => ({
  //   match: {
  //     "type": category
  //   },
  // }));

  // console.log('conditions',conditions);



  const { body } = await client.search(
    {
      index: "locations2",
      body: {
        from:0,
        size:400,
        query: {
            // "constant_score" : {
                // "filter" : {
                    "term" : {
                        "name.keyword" : name
                    }
                // }
            // }
          // bool: {
          //   // should: conditions,
          //   must: {
          //     match: {
          //       "name": name,
          //     },
          //     // conditions
          //   },
          // },
        },
      },
    },
    { ignore: [404] }
  );

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
          
  // console.log('search',body);
  return body.hits.hits.map(({_source}) => _source);
}

//get location info by hashtag in location4
async function searchLocations4(selectedTag,categoryId) 
{
  var conditions = []

  //REMOVE AFTER ALL
  categoryId = selectedTag === 'театр' ? 3 : categoryId

  if(categoryId == '0'){
    conditions = [
       {
          "term": {
             "mainkeyword": selectedTag
            
          }
       }
    ]
  } else {
      conditions = [{
          "term": {
            "category": categoryId
          }
        },
        {
          "term": {
             "mainkeyword": selectedTag
            
          }
        }
    ]
  }

  // console.log('conditions',conditions)
  // console.log('selectedTag',selectedTag)
  // console.log('categoryId',categoryId)

  const { body } = await client.search(
    {
      index: "locations4",
      body: {
        from:0,
        size:60,
        query: {
          // "dis_max": {
          //   "queries": [
          //     { "match": { "mainkeyword": selectedTag }},
          //     { "match": { "category": categoryId }}
          //   ],
          //   "tie_breaker": 0.3
          // }
          bool: {
            // should: {
            //   match: {
            //     "mainkeyword": selectedTag,
            //   },              
            //   match: {
            //     "category": categoryId,
            //   },
            // }
            "must": conditions,
          },
        },
      },
    },
    { ignore: [404] }
  );

    // name: 'SimpleWine',
    // address: 'Россия, Москва, Гончарная улица, 40/8',
    // website: 'http://www.jao-da.ru/',
    // phone: '+7 (495) 624-56-11 +7 (495) 623-28-96',
    // type: 'Магазин алкогольных напитков',
    // workhours: 'пн-пт 11:00–6:00, сб,вс 12:00–6:00',
    // lat: '55.740316',
    // lon: '37.650787',
    // map: 'https://static-maps.yandex.ru/1.x/?lang=&ll=37.650787,55.740316&size=450,450&z=18&l=map&pt=37.650787,55.740316,pm2rdl1~37.650787,55.740316,flag',
    // description: '',
    // maintag_2: '',
    // maintag: 'SimpleWine\n',
    // category: '1',
    // mainkeyword: 'вино',
    // img: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/709fbb78641003.5ced7825c4286.png'
          
  return body.hits.hits.map(({_id,_source}) => { _source.id = parseInt(_id); return _source});
}

module.exports = { 
  // search,
  searchTags,
  searchLocation3,
  searchLocations4,
  searchLocations,
  searchPosts
}







