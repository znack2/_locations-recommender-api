process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { Client } = require("@elastic/elasticsearch");
const fs = require('fs');

const client = new Client({
  node: "https://ec2-18-184-212-150.eu-central-1.compute.amazonaws.com:9200",
  auth: {
    username: "elastic",
    password: "l0StiazaR56sexV3uqOw",
  },
});



const data = JSON.parse(fs.readFileSync(__dirname + '/sample.json'));

const index= 'locations';
// const type = config.es_type;
// const index= config.es_index;

async function search(index,locationIds = []) {
  const conditions = locationIds.map((id) => ({
    match: {
      "location.id": id,
    },
  }));

  const { body } = await client.search(
    {
      index: index,
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
  return body.hits.hits.map(({_source}) => _source);
}


  // /.reporting-<yyyy.mm.dd>/_delete_by_query

async function delete_by_query(index,locationIds = []) {
  // /.reporting-<yyyy.mm.dd>/_delete_by_query

  const { body } = await client._delete_by_query(
    {
      index: "insta_data-*",
      // index: "insta_data-*",
      body: {
        query: {
           "match_all": {} 
        },
      },
    },
    { ignore: [404] }
  );
  
  return body.hits.hits.map(({_source}) => _source);
}

async function create(index, data){
    for (let i = 0; i < data.length; i++ ) {
      await client.create({
        refresh: true,
        index: index,
        id: i,
        body: data[i]
      }, function(error, response) {
        if (error) {
          console.error("Failed to import data", error);
          return;
        }
        else {
          console.log("Successfully imported data", data[i]);
        }
      });
    }
}

async function createMapping (index, type) {
  const Schema = {
      // title: result.name,
      // latitude: result.lat,
      // longitude:result.lon, 
      // address:result.address,
      // type:result.type,
      // workHours: {
      //     from: result.from,
      //     until: result.to,
      //   },
      // phoneNumber:result.phont,
      // website: result.website,
      // averageBillUSD
      // restriction
      // description
      // googleLink
      // photos []
      // numberOfUsersSelectedThisLocation
      // lastFiveUsersSelectedThisLocation []

      // positiveReviews:
      // negativeReviews: 

      "title": {
        "type": "long"
      },
      "Cylinders": {
        "type": "long"
      },
      "Displacement": {
        "type": "long"
      },
      "Horsepower": {
        "type": "long"
      },
      "Miles_per_Gallon": {
        "type": "long"
      },
      "Name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "Origin": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "Weight_in_lbs": {
        "type": "long"
      },
      "Year": {
        "type": "date"
    }
  }

  //   {
  //   "order": 0,
  //   "index_patterns": [
  //     "insta-all-tags"
  //   ],
  //   "settings": {
  //     "index": {
  //       "number_of_shards": "1",
  //       "number_of_replicas": "0"
  //     }
  //   },
  //   "mappings": {
  //     "properties": {
  //       "index": {
  //         "type": "long"
  //       },
  //       "topic": {
  //         "type": "keyword"
  //       },
  //       "hashtag": {
  //         "type": "text"
  //       }
  //     }
  //   },
  //   "aliases": {}
  // }
  return client.indices.putMapping({index, type, body:{properties:Schema}});
}


const result = search('insta_data-*',['1040767716095735'])
// const result = create(index,data)

console.log('result',result)

// module.exports = {
//   async resetIndex(){
//    if (client.indices.exists({ index })) {
//        client.indices.delete({ index });
//      }
//   client.indices.create({ index });
//   createMapping(client, index, type);
//   create(index, data);
//   }
// };

// module.exports = { 
//  search,
//  create,
//  createMapping,
//  delete_by_query
// }









