const config = require('config');
const ApiError = require('../errors/ApiError');
const models = require('../../models');
const { getRecomendations } = require('../../services/personalizeService');

const { 
  searchPosts,
} = require('../../services/elasticService');

const stopWordsArray = ['доктор','продаже','изготовления','Исполнитель','Менеджер','оплата','доставка','производство']

async function getPosts (location, callback){

  // console.log('getPosts','location',location)

  if(location.maintag && location.maintag !== undefined || location.maintag_2 && location.maintag_2 !== undefined){
  // if(location.website && location.website !== undefined){
    var posts = await searchPosts([location.maintag]);//location.maintag_2

    var storage = [];

    // console.log('getPosts_before',posts);

    var stopWords = post => stopWordsArray.some(stopword=>post.includes(stopword))

    const postsData = posts.sort((a,b) => {
                          return a.insta_description.includes(location.maintag) > b.insta_description.includes(location.maintag) ? 1 : -1
                        })
                        // .sort(post => post.insta_description.includes(location.maintag))
                        .filter(post => !stopWords(post.insta_description))
                        .map(post => {
                          const already = storage.includes(post.display_url)
                          // console.log('already',already);
                          // console.log('photo_storage_before',storage.length);
                          if(already === false){
                            storage.push(post.display_url)
                            // console.log('photo_storage_after',storage.length);
                            return {
                              photo: post.display_url,
                              post: post.insta_description.replace('&quot;','')
                            }
                          }
                        });

    // console.log('getPosts_after',postsData);
    // console.log('getPosts',postsData2);

    //ADD MAIN IMAGE
    postsData.push({
      photo: location.img,
      post: location.description
    })

    //output
    callback(postsData);
  }
};

module.exports = {
  getPosts
}
