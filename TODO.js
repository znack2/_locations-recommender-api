
replace preferences to array

local/prod - front build new with right url 

- docker down volumes db

replace in controller getUserPreferences

https://github.com/psikoi/wise-old-man - nodejs sample
https://github.com/VadimCpp/events4friends-mobile - react-native

git push origin +HEAD^:<name of your branch, most likely 'master'>

1) run local back and front - net::ERR_SSL_PROTOCOL_ERROR
  https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71
  https://medium.com/bros/enabling-https-with-lets-encrypt-over-docker-9cad06bdb82b





------------------------------------

- if no (check if not exist^ show error)
  ?user_id
  *currentLocation 
  *categoryId 
  preferences
  *tags
  uniqueLocationIds
  *locationHashes

1) user type any tag - get list of recommendation
- test user tag affect recommendation

2) go to one recommendation - get photos from insta
- test each recommendation show different posts


--------------------------------

improve
- env - https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
- remove reports
- https://blog.logrocket.com/elasticsearch-query-body-builder-node-js/
- colab 
  https://drive.google.com/drive/folders/16ruUCvSbLAt9FCCbsTIbGlGhn6g4WJlt
  https://colab.research.google.com/drive/1WmYhJG8e3LlYyuDU_nAiKiGieOLwRsM5#scrollTo=ISoVrlsl188P
  https://colab.research.google.com/drive/150lLOqnE0C5RALU5QGdPgT79GAf0S6fg
  https://colab.research.google.com/drive/1hnMcbzS7GWLEvLPNPGqkK6u-_IYQFkmc#scrollTo=hU-vXhBof3Ap


  -----------------------
























CHECK IT :



  //4) get location info by hashtag in location2
  // const locationData = await search4(locationHash);
  // console.log('locationData',locationData); 



   var queue = [];
   for (var i = 0 ; i < pools.length ; i++) {
     queue.push(function(callback) {
        var url = pools[i];
        request(url, function (error, response, body) {
            if (!error) {
              var $ = cheerio.load(body,{
               ignoreWhitespace: true
             });
            // Do something with the result you get here
            // mark as done
            callback(null, url);
          }
     })
   };

  async.parallel(queue, function (err, result) {
     if (err) throw err;
     console.log("DONE");
  })

      // const result = listOfRecommendations.map(function(recommendationData){
      //   const type = in_array(preferences,arrayTypes);
      //   recommendationData.type === type 
      // });

      // arrayTypes.includes(preferences);


  //5) sort locationHash by distance
  // const opts = {
  //   yName: 'lat',
  //   xName: 'lon'
  // }
  //get array of lat/lan from locations
  //sort lat/lan 
  //affect on locationData
  // const filteredLocation = locationData.sort(location => {
      // location.location
      // sortByDistance(currentLocation, locationData, opts);
      // return 
  // })
  // const locations = sortByDistance(currentLocation, locationData, opts);
  // console.log('locations',locations);


  //take each location
  //send hash 
  //search by hash
  //set mainphoto for each location
  // locationData = await search6(locationData.map(location=>{
  //   location.mainphoto = photo;
  // }));

  
 //  const someFunction = locationHash => {
 //    const promises = locationHash.map(async (location) => {
 //        const data = await search4(location.name);
 //        const posts = await search6(location.hash);
 //        data.photo = posts.map(post=>post.display_url);
 //        data.mainphoto = await searchYandex(location.name);
 //        return data;
 //    });
 //    return Promise.all(promises);
 // }

 // const locationData = await someFunction(locationHash);


//2

// const someFunction = async locationHash => {
//     let result = []
    
//     for (const location of locationHash) {
//       let page = await search4(location.name)
//       const posts = await search6(location.hash)

//       page.photo = posts.map(post => post.display_url)
//       // page.mainPhoto = await searchYandex(location.name)
      
//       // result.push(page)

//       // const result = page.map((item) => {
//       //   return (
//       //       lat: item.location.lat,
//       //       lon: item.location.lon,
//       //       photo: posts.map(post => post.display_url),
//       //       mainPhoto: await searchYandex(location.name)
//       //   )
//       // })
//     }
    
//     return result
// }



   //  const someFunction = (locationData,locationHash) => {
 //    const promises = locationData.map(async (location) => {
 //        return {
 //            photo: await search6(location.name)
 //        }
 //    });
 //    return Promise.all(promises);
 // }

 // const result = await someFunction(locationData,locationHash);
 // console.log('result',result);
  





 //  const someFunction2 = locationData => {
 //    const promises = locationData.map(async (location) => {
 //        yandeximages.Search(location.name, false, url => {
 //          location.mainphoto = url;
 //        })
 //    });
 //    return Promise.all(promises);
 // }

 // const result2 = await someFunction2(locationData);
 // console.log('result2',result2);





// filter by category
  // const locationDatanew = locationData.filter(location => {
  //   return location.subtype === preferences;
  // })
  // console.log('filter',locationData);

  //get array of locationHash from locationData



    // const arraylocations = [];

  // locationData.forEach(location => {
  //   arraylocations[] = location.location;
  // })






  // locationData.forEach(location => {
  //get type by location.name
  //   location.subtype = locationData.filter((loc) => {
  //         if(location.name === loc.name){
  //           return loc.type;
  //         }
  //     });
  //     location.photo = posts.filter(post => {
  //         if(location.name === post.name){
  //           return post.thumbnail_src;
  //         }
  //     });
  // })



            // async function filterPhotos(arr, callback) {
            //   const fail = Symbol()
            //   return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
            // }


//  const getPage2 = async location => {
//   return Object.assign({mainPhoto:await searchYandex(location.name)},location)
//   // return Object.assign(page, {
//   //   mainPhoto: await searchYandex(location.name)
//   // })
// }

// const someFunction2 = result => Promise.all(result.map(getPage2));


// const result2 = await someFunction2(result);


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

