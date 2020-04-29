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
        query: {
          bool: {
            should: conditions,
          },
        },
      },
    },
    { ignore: [404] }
  );
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
  console.log(body);
  return body.hits.hits.map(({_source}) => _source);
}

// search by hashtag in insta-data-*
async function searchPosts(hash) {

  // console.log('search6',hash);

  const { body } = await client.search(
    {
      index: "insta_data-*",
        body: {
          query: {
            bool: {
              should: {
                match: {
                  "insta_description": hash,
                },
              }
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
        query: {
          bool: {
            // should: conditions,
            should: {
              match: {
                "name": name,
              },
              // conditions
            },
          },
        },
      },
    },
    { ignore: [404] }
  );
  // console.log('search',body);
  return body.hits.hits.map(({_source}) => _source);
}

module.exports = { 
  // search,
  searchTags,
  searchLocation3,
  searchLocations,
  searchPosts
}







