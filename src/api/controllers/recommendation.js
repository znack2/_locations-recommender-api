const ApiError = require('../errors/ApiError');

module.exports = {
  getRecommendation: async (req, res, next) => {
    try {
      res.json([
        {
          id: 105301,
          type: 'restaurant',
          address: 'Divisadero St, 560, San Francisco',
          latitude: 37.7748986,
          longitude: -122.437489,
          googleLink:
            'https://www.google.com/maps/place/Nopa/@37.7749051,-122.439697,17z/data=!3m1!4b1!4m5!3m4!1s0x808580afc823d4fd:0x58725c5c1643cf05!8m2!3d37.7749009!4d-122.4375083',
          title: 'Nopa',
          description:
            'The food has creative and tasty options. The rotate and change quite often, especially their flatbed which are all quite good',
          photos: [
            'http://nopasf.com/wp-content/uploads/2016/09/nopa-gallery-16.jpg',
            'http://nopasf.com/wp-content/uploads/2016/09/nopa-gallery-17.jpg',
            'http://nopasf.com/wp-content/uploads/2016/09/nopa-gallery-20.jpg',
          ],
          averageBillUSD: 30,
          website: 'nopasf.com',
          phoneNumber: '+1 (415) 864-8643',
          restriction: null,
          workHours: {
            from: '17:30',
            until: '00:00',
          },
          positiveReviews: 1996,
          negativeReviews: 174,
          numberOfUsersSelectedThisLocation: 27,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e15/10986232_792204010864591_1943951351_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=0CefYx0zadQAX8p5bip&oh=fcd26afd66d0b7457361ae7fe17d085e&oe=5EB31E94',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/22708961_137397253576283_1641343055204188160_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=OfmyBIOuIeYAX8nTOit&oh=f1ba466480f93e66485892d710fa4b1a&oe=5EB044C8',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/71024040_130228614600586_7919094803550290139_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=y4DWTigwpR8AX9xvyj4&oh=29a25d5b1ca3fe8e819f568107e605b3&oe=5EAE41D7',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/82093019_2496883707190074_7533803060583622926_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=UPkeN14n8nsAX9UCYqq&oh=9c3fff6fb03b4a5727809198c9f6dacc&oe=5EAF176E',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/88257534_538727656756767_5275621189640973434_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=Dlvjhc4WN0UAX8xjzEK&oh=3d967b5544d0dd27ef0e41119a90294e&oe=5EADCFDB',
          ],
        },

        {
          id: 105302,
          type: 'restaurant',
          address: 'Gough St, 199, San Francisco',
          latitude: 37.7752096,
          longitude: -122.4227735,
          googleLink:
            'https://www.google.com/maps/place/Rich+Table/@37.7749042,-122.4249887,17z/data=!3m1!4b1!4m5!3m4!1s0x8085809f40b8fd87:0x7b5e765335d416ff!8m2!3d37.7749!4d-122.4228',
          title: 'Rich Table',
          description: 'Excellent meal with equally excellent service',
          photos: [
            'https://insidescoopsf.sfgate.com/wp-content/blogs.dir/732/files/the-tasting-menu-at-rich-table/rich-table-dining-room-storey-12.jpg',
            'https://www.chowhound.com/blog-media/2013/01/rsz_7370599448_78401ca37f_z.jpg',
            'https://s3-media0.fl.yelpcdn.com/bphoto/ivuhWaRZ8fGJGfWjC4YZVQ/o.jpg',
          ],
          averageBillUSD: 40,
          website: 'richtablesf.com',
          phoneNumber: '+1 (415) 355-9085',
          restriction: null,
          workHours: {
            from: '17:00',
            until: '22:30',
          },
          positiveReviews: 848,
          negativeReviews: 54,
          numberOfUsersSelectedThisLocation: 16,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e15/924128_673588662766647_1980238627_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=JA35yp_7iTAAX_TGJiR&oh=fb0f15778fcce05465c073e9e6a6a3af&oe=5E9F5448',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/54513395_332358327464541_4531456297764331129_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=humhCVzwBlMAX9Z5ZwS&oh=f3e8fd5c8453e2774f96b31691eb5450&oe=5EB14B41',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/67274680_258437598456340_2548719333775600602_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=vlj17aq4POIAX9d77jO&oh=898719e66f567c8737680fd2eb5e1cad&oe=5EB035BE',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/68932548_471283307058944_2955313682949264201_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=YuGry8QKJP4AX83Xrya&oh=0ebe382a336343f707d11cf80cfab938&oe=5EB0770F',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/35000827_234918547296303_4226773815318806528_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=cqQ6C1RHIFQAX9q5M9G&oh=197e92e804983780fea521f1499e1468&oe=5EAF60E9',
          ],
        },

        {
          id: 105303,
          type: 'restaurant',
          address: 'Geary Blvd, 1101, San Francisco',
          latitude: 37.785576,
          longitude: -122.42161,
          googleLink: `https://www.google.com/maps/place/Tommy's+Joynt/@37.7855232,-122.4239997,17z/data=!3m1!4b1!4m5!3m4!1s0x808580967f112a53:0x245af671133d8ee3!8m2!3d37.785519!4d-122.421811`,
          title: `Tommy's Joynt`,
          description: 'Great place to get a quick bite.',
          photos: [
            'https://images.squarespace-cdn.com/content/v1/55f2314de4b0dbda5ff067b9/1570577173145-EIDUKJJYBGE2CCGWLX6O/ke17ZwdGBToddI8pDm48kAyxJwNa_tCxflIkt0A9RyV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hHMyhIh2kKzuOL3ydJCryCcqYoWtlM1EOiJ1kCaFs77Xi78fbPhYZqwHR98iIF0EQ/nightjoynt.jpg?format=2500w',
            'https://images.squarespace-cdn.com/content/v1/55f2314de4b0dbda5ff067b9/1445981515793-9LZNVCLSP6O7LBU8JRK0/ke17ZwdGBToddI8pDm48kCpX2mwG9slVUzQCwhOMrQF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UVDXM9yQ8sG6x3COIEUaadqpk9XPubC0H4MH9Az_c7nPqIjSxZ2rgD2_Fw9U6DWfsg/tommys_drinksmenu_1.jpg?format=2500w',
            'https://images.squarespace-cdn.com/content/v1/55f2314de4b0dbda5ff067b9/1445981239164-54U1VO3IIQ3SA94UBWGT/ke17ZwdGBToddI8pDm48kCpX2mwG9slVUzQCwhOMrQF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UVDXM9yQ8sG6x3COIEUaadqpk9XPubC0H4MH9Az_c7nPqIjSxZ2rgD2_Fw9U6DWfsg/tommys_foodmenu_1.jpg?format=2500w',
          ],
          averageBillUSD: 15,
          website: 'tommysjoynt.com',
          phoneNumber: '+1 (415) 775-4216',
          restriction: null,
          workHours: {
            from: '10:00',
            until: '01:30',
          },
          positiveReviews: 2766,
          negativeReviews: 377,
          numberOfUsersSelectedThisLocation: 37,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-frt3-2.cdninstagram.com/v/t51.2885-15/e15/11232533_1587528311486559_902405664_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=8Sl8SSl8KKgAX-c17yY&oh=512db5d96123dad12e96c74ec5361182&oe=5EA0C2D0',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/70836438_566143104219998_4145359795023495933_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=sIKghovCpXgAX9qSog0&oh=1d3530392157f33baeb363e1ed998e16&oe=5EAD8159',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/68719155_496195690941284_544724157274211617_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=gwg7w1IUa3YAX8Dp16T&oh=7d18eb8d5fa1c46bc9b31ea8637e386f&oe=5EB13942',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/47253023_1988680927888965_3526217850273560826_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=WIPjwWEDh8oAX_CXci7&oh=7431adefa75bc91afcb58d5f2fabc4ad&oe=5EAE6004',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/43143214_193097781585964_3483548352190244571_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=jYdWGEgfI_oAX9Glz_3&oh=44c8e9d414680bb411b5a07b2c19e3e8&oe=5EADE04B',
          ],
        },

        {
          id: 105304,
          type: 'restaurant',
          address: 'Eddy St, 601, San Francisco',
          latitude: 37.7829355,
          longitude: -122.418226,
          googleLink:
            'https://www.google.com/maps/place/Chambers/@37.7749662,-122.4375083,14z/data=!4m8!1m2!2m1!1sChambers!3m4!1s0x0:0xa50ff187b005e604!8m2!3d37.7831423!4d-122.418015',
          title: 'Chambers',
          description: 'Amazing cocktails and delicious food.',
          photos: [
            'https://scontent-sjc3-1.xx.fbcdn.net/v/t31.0-8/241175_428691583867411_797221394_o.jpg?_nc_cat=103&_nc_sid=6e5ad9&_nc_ohc=5vBdKgakLz8AX8ZPddL&_nc_ht=scontent-sjc3-1.xx&oh=c9432183e000b168fd387385ed428d0d&oe=5EAAB871',
            'https://d2g8igdw686xgo.cloudfront.net/46343944_1584814493928810_r.jpeg',
            'https://hctg-images.imgix.net/images/venues/chambers-eat-drink/RD20190731-ChambersEatDrink-03.jpg?auto=format%2Ccompress&fit=clamp&h=430&s=1d22e4fb690d0ad2227d5cb1d0e73987',
          ],
          averageBillUSD: 35,
          website: 'chambers-sf.com',
          phoneNumber: '+1 (415) 496-5178',
          restriction: null,
          workHours: {
            from: '17:00',
            until: '00:00',
          },
          positiveReviews: 313,
          negativeReviews: 51,
          numberOfUsersSelectedThisLocation: 23,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/72472219_476910512901287_988152663428411872_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=0ydS9SLU8z8AX81u381&oh=a167ca0a09042e4e346f406c6da6cad2&oe=5EAD6C32',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/18161839_792387820915723_5475634066000707584_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=Uqc6X6QH8AUAX8zdb6N&oh=954cacc040e49ed47af959b8e69929e8&oe=5EAF364E',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/62229320_2384375048311763_3572674128893474691_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=rHDlrAEgmjUAX82Kzv4&oh=3f6eb561c8921bf162f4dccae3e38fec&oe=5EAE29CE',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/64220847_145301899946252_7242847653360356347_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=4FstRTfBq58AX83_4Pd&oh=3bdf4bdfe20e1f579e80c4d3b8a81c7a&oe=5EB0DE3B',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/53211768_787953314905974_7139842240458719550_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=AJ_Onr8apdwAX9vQVpx&oh=427a4891a0db696bb615ff223f965c41&oe=5EAE9DC5',
          ],
        },

        {
          id: 105305,
          type: 'restaurant',
          address: 'Geary St, 501, San Francisco',
          latitude: 37.7866329,
          longitude: -122.4119521,
          googleLink:
            'https://www.google.com/maps/place/Tratto/@37.7868136,-122.4138895,17z/data=!3m1!4b1!4m5!3m4!1s0x8085808e33e1f575:0x2bf3a0751c74be10!8m2!3d37.7868094!4d-122.4117008',
          title: 'Tratto',
          description:
            'Nice atmosphere with good italian food.   Honest priced house wine, a very good price performance.',
          photos: [
            'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-0/p640x640/51798031_1172914892871324_5632973574345064448_o.jpg?_nc_cat=100&_nc_sid=2d5d41&_nc_ohc=fgSzfRaFrscAX_wKwG7&_nc_ht=scontent-sjc3-1.xx&_nc_tp=6&oh=ef1d5041ac92fd5770963bca01174860&oe=5EAC172E',
            'https://s3-media0.fl.yelpcdn.com/bphoto/xxiFvS0l4R7ZMqRTLuOxow/o.jpg',
            'https://zagat-photos.imgix.net/ChIJdfXhM46AhYAREL50HHWg8ys/6a0ac1aebed58437fdadb9c37240f159.jpg?max-w=1400&auto=format',
          ],
          averageBillUSD: 50,
          website: 'tratto-sf.com',
          phoneNumber: '+1 (415) 292-0101',
          restriction: null,
          workHours: {
            from: '11:30',
            until: '02:30',
          },
          positiveReviews: 534,
          negativeReviews: 102,
          numberOfUsersSelectedThisLocation: 14,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e15/89027637_256640902005655_5043582243672821184_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=XUkf6MZJ480AX8L6gMA&oh=a766d3fea8ed3be27246ef515dba1aad&oe=5EAFD449',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/fr/e15/p1080x1080/80134913_448464692700218_8093930284072245664_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WzX3BiNtl0QAX8vjcs8&oh=b130cc9e49c3fa6896bc79c578bdcdef&oe=5EADF214',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/79378799_102223227904979_2784362220605279958_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AC6pNE1_tYcAX98XEjI&oh=40ec1e8bfbb6a1e426dc0cbbbf946f91&oe=5EAE1457',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/fr/e15/p1080x1080/68942504_138887904003718_6807732461083329697_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=S_AAuSlrz_QAX8mXkgV&oh=40a7999e1841ccf040a5ae9943d30d17&oe=5EAD99FF',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/54510923_401772933704368_5539251699628690953_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Hs3J-SokhHAAX9NxnYN&oh=deff027c01f202894300768b45ef3da5&oe=5EADF4DE',
          ],
        },

        {
          id: 105306,
          type: 'restaurant',
          address: '16th St, 3583, San Francisco',
          latitude: 37.7641395,
          longitude: -122.4325631,
          googleLink:
            'https://www.google.com/maps/place/Starbelly/@37.764082,-122.4347609,17z/data=!3m1!4b1!4m5!3m4!1s0x808f7e1c6201a6b3:0xdd4285d4ab09b5e0!8m2!3d37.7640778!4d-122.4325722',
          title: 'Starbelly',
          description: `If you are looking at local places to eat or drink... don't hesitate, just go to Starbelly.`,
          photos: [
            'https://infatuation.imgix.net/media/reviews/starbelly/banners/Starbelly_0.jpg?auto=format&h=840&w=1336',
            'https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/StarbellyPatio_KimberleyHasselbrink.jpg?itok=NBxZ_t07&timestamp=1401907388',
            'http://www.tablehopper.com/chatterbox/assets_c/2010/11/starbelly-patio-thumb-300xauto-1830.jpg',
          ],
          averageBillUSD: 25,
          website: 'starbellysf.com',
          phoneNumber: '+1 (415) 252-7500',
          restriction: null,
          workHours: {
            from: '12:00',
            until: '20:00',
          },
          positiveReviews: 1095,
          negativeReviews: 149,
          numberOfUsersSelectedThisLocation: 27,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/44787202_261732361194172_199449653637958776_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=JCm2YIy7kZoAX_YrHem&oh=3a152d8a2a44ff198f340fa5794546a1&oe=5EAFD528',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/36896009_489825671463077_7834430908122791936_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=_aoPTslYk7YAX-EwOsX&oh=e179be52d00d241b1a9d9991b8043480&oe=5EADE833',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e15/36644126_1861610863899953_8838439789133824000_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=1Iqh4kpVw3kAX-siRYR&oh=779c89249eb1d7fc81c7ec5965c82612&oe=5EAE283A',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e15/31262323_198972244229481_363343959679827968_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=j7lpzsiy3t8AX8QhdE5&oh=1e4c6701269a41084085a0b3a1069f54&oe=5EAE89EB',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/28153653_558893061148041_3654189679021916160_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=SmpNqToEMa0AX8fc73u&oh=3f07e64c801e040737cbaca4349c8568&oe=5EAE0E89',
          ],
        },

        {
          id: 105307,
          type: 'restaurant',
          address: 'Mission St, 2534, San Francisco',
          latitude: 37.7713391,
          longitude: -122.4195131,
          googleLink:
            'https://www.google.com/maps/place/Foreign+Cinema/@37.7564959,-122.4213081,17z/data=!3m1!4b1!4m5!3m4!1s0x808f7e3ec8cb0b3f:0x2f54db460b3cf3d9!8m2!3d37.7564917!4d-122.4191194',
          title: 'Foreign Cinema',
          description:
            'Perfect for a special occasion and one of the best for a date in SF.',
          photos: [
            'http://foreigncinema.com/wp-content/uploads/about-2-web-1-1600x1068.jpg',
            'https://gavinfarrington.com/wp-content/uploads/2014/10/037-san-francisco-foreign-cinema-wedding-photography.jpg',
            'https://images.squarespace-cdn.com/content/v1/54594723e4b0670d2d3b54f9/1517427995753-H7AHPJ1NR0XHCTKAHPBS/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/Where+to+Eat+in+SF+-+Foreign+Cinema+-+by+Madeline+Lu?format=1000w',
          ],
          averageBillUSD: 35,
          website: 'foreigncinema.com',
          phoneNumber: '+1 (415) 648-7600',
          restriction: null,
          workHours: {
            from: '17:30',
            until: '22:00',
          },
          positiveReviews: 1858,
          negativeReviews: 206,
          numberOfUsersSelectedThisLocation: 11,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/83085237_3127305297494773_6664403570675257133_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=hmowI9OmYdIAX8zBRKW&oh=bcff403fa802390748b458e4afbf1787&oe=5EB066ED',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/83751253_818575971940491_348922997142232887_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=MuwqiDeUHbIAX87l3m3&oh=9dd15b7e9ba9f2b22a4df4173183406a&oe=5EB134B5',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/21041021_1731157527186332_2485289745022713856_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=0aUbD8Hal3QAX94cdcI&oh=d8698cacaa9d3ead235add94f62882ef&oe=5EAE1C98',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/35001765_322746608257198_3327406847492620288_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=01ICw1HaBMUAX86yo3M&oh=ccf80b49412c064b14b60ce8ca7e2935&oe=5EB0DA38',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/73533248_522972088427222_5547682159095462121_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=xFz_FUICNNQAX-J36tW&oh=050271fad83206a73db8145b988dc595&oe=5EAD6FF4',
          ],
        },

        {
          id: 105308,
          type: 'restaurant',
          address: 'Clement St, 50, San Francisco',
          latitude: 37.7729337,
          longitude: -122.4412588,
          googleLink:
            'https://www.google.com/maps/place/Eats/@37.7832746,-122.4622218,17z/data=!3m1!4b1!4m5!3m4!1s0x8085873989353a2d:0x392e26ca24f22acd!8m2!3d37.7832704!4d-122.4600331',
          title: 'Eats',
          description: 'Big portions and quick and friendly service.',
          photos: [
            'https://images.squarespace-cdn.com/content/v1/5a5e9f632aeba5cfcee2f7a7/1534877143469-8J17FF9WZCUBZKPBGYWK/ke17ZwdGBToddI8pDm48kCbTK4wfmkGPSzwGnITGAoF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmru5j-AQBePNiDV9hZLaF5B_mv9bt9p50jAIDmVcYJ5ybglA2KMEHO6h21iEeeYf4/AA1_2169.jpg?format=750w',
            'https://images.squarespace-cdn.com/content/v1/5a5e9f632aeba5cfcee2f7a7/1535564971612-G0XEH8AHB2HXUQ4RFYJI/ke17ZwdGBToddI8pDm48kNskRmI0BWA_5BbSP7w5fxoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcrSE9TuikxunCIvxhiHV1d9s8_ONrEB_pXn7BM6FVWGHcXaz5OAcxgkcgDk7TY0a9/AA1_2195.jpg?format=1500w',
            'https://images.squarespace-cdn.com/content/v1/5a5e9f632aeba5cfcee2f7a7/1534877110109-QDVIYU9IZHYBB9Y0MGRL/ke17ZwdGBToddI8pDm48kNskRmI0BWA_5BbSP7w5fxoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcrSE9TuikxunCIvxhiHV1d9s8_ONrEB_pXn7BM6FVWGHcXaz5OAcxgkcgDk7TY0a9/AA2_1992.jpg?format=1500w',
          ],
          averageBillUSD: 25,
          website: 'eatsrestaurantsf.com',
          phoneNumber: '+1 (415) 751-8000',
          restriction: null,
          workHours: {
            from: '08:00',
            until: '02:30',
          },
          positiveReviews: 417,
          negativeReviews: 46,
          numberOfUsersSelectedThisLocation: 15,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/90636627_205795784189333_6271222379499645718_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=GjjeD8IqQdcAX9tFIyW&oh=be379ebc6fea2e3cee7be0ec77325ca0&oe=5EADD9BA',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/66622297_444987489439479_6167303879135142102_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=fpJfaXQFb4oAX9d-loq&oh=224183f1c29bd6c7d4876a6a4d2777f7&oe=5EAE2AA3',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/57239229_385009032104652_5188478269908234932_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=foja5oa6nGEAX-tHGmF&oh=41a57e6cb4dd7305d3f63638c4c430b5&oe=5EB0B826',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/72300565_827599910975703_3146316642711453822_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=WgwniXJ4WDwAX-R7O4o&oh=b832791b8a6f258e1382143fb29acdfc&oe=5EAFF5D7',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/50064668_354228648500093_3020695613154935463_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=3iDx5F-u3VkAX_n-gPT&oh=83c79f1643cb1bd309acb7a0ba6f1d8b&oe=5EB0E8E0',
          ],
        },

        {
          id: 105309,
          type: 'restaurant',
          address: 'Union St, 601, San Francisco',
          latitude: 37.800326,
          longitude: 37.800326,
          googleLink: `https://www.google.com/maps/place/Original+Joe's/@37.8000973,-122.4110034,15.75z/data=!4m8!1m2!2m1!1sOriginal+Joe's!3m4!1s0x808580f1118b217d:0x3937c8b9b320c10b!8m2!3d37.8001849!4d-122.4093139`,
          title: `Original Joe's`,
          description:
            'This place is one of the only restaurants actually resembles the quality and portion size you would enjoy. ',
          photos: [
            'https://upload.wikimedia.org/wikipedia/commons/3/3e/Original_Joes_North_Beach_SF.jpg',
            'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/35346485_2530737613619217_6518691063090118656_o.jpg?_nc_cat=102&_nc_sid=6e5ad9&_nc_ohc=eq1JMtxZgOEAX-M95UY&_nc_ht=scontent-sjc3-1.xx&oh=2baf01a9a862e997d77e894af7339af1&oe=5EAB8F11',
            'https://media-cdn.tripadvisor.com/media/photo-s/0a/aa/d1/2b/original-joe-s-bar.jpg',
          ],
          averageBillUSD: 20,
          website: 'originaljoes.com',
          phoneNumber: '+1 (415) 775-4877',
          restriction: null,
          workHours: {
            from: '11:30',
            until: '22:00',
          },
          positiveReviews: 1487,
          negativeReviews: 165,
          numberOfUsersSelectedThisLocation: 23,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/69646794_495107607991602_5966807213710908766_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=uZ-ds55zeF8AX-4R5Cq&oh=0d1bc8138e27deafa6dc0026c8268c3f&oe=5EAF11AA',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/67621345_897145760672203_990970709320557991_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=gxYEpx7zpkQAX-CAiUi&oh=bcf503c84b7ce4a0594368aa767381f2&oe=5EAE8A6C',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/88984225_183812562904450_5968599174507812604_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=NhWkU1aze2QAX-OhKoH&oh=9d203a7ef68333f6e3ce4660fd5d965d&oe=5EAED6EB',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/81786130_2708269005934150_6885926060002314144_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=fufzHJMKxxYAX83J8pl&oh=a86a2a2ee08aa886f07b6ca5efbaa438&oe=5EAFF1E5',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/84444187_2544060512506310_1915120477590225775_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=bVRHEuFnzMgAX8mhCH0&oh=df3c7ba097731012d61e08e8a0e177bf&oe=5EAFE6ED',
          ],
        },

        {
          id: 105310,
          type: 'restaurant',
          address: 'Hyde St, 2765, San Francisco',
          latitude: 37.8062822,
          longitude: -122.4205887,
          googleLink:
            'https://www.google.com/maps/place/The+Buena+Vista/@37.8065433,-122.4209004,19.75z/data=!4m5!3m4!1s0x808f7e37f0d196f9:0xcf2a7b909a94bfc3!8m2!3d37.8065611!4d-122.4206889',
          title: 'The Buena Vista',
          description: 'Fun atmosphere with over 100 years of service.',
          photos: [
            'https://i.pinimg.com/564x/a8/19/9f/a8199f55709a8e0bc517783fdd5ec25a.jpg',
            'https://i.pinimg.com/564x/32/72/1f/32721f742f0db50129c616d2f04af450.jpg',
            'http://onbetterliving.com/wp-content/uploads/2018/03/BuenaVista-Bar.jpg',
          ],
          averageBillUSD: 35,
          website: 'thebuenavista.com',
          phoneNumber: '+1 (415) 474-5044',
          restriction: null,
          workHours: {
            from: '09:00',
            until: '02:00',
          },
          positiveReviews: 4277,
          negativeReviews: 372,
          numberOfUsersSelectedThisLocation: 32,
          lastFiveUsersSelectedThisLocation: [
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e15/80022843_156712638969452_3525742154526126035_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=8-bI_0xXXXoAX8Swxiv&oh=c000a882ab3f3ecfb731a2d553de7b79&oe=5E87D8E0',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/72787991_176787776809551_6222200597024517278_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=F2MEM_h7cWEAX-hIe-C&oh=f7a4200dc1d6a4413ce271dd5e42749b&oe=5EB12EEB',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/60497382_425410328245813_7193376035220333793_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=hOuBOfJv1J8AX-o-1vW&oh=daf5c47129b4b3be43c913f26dc47cc6&oe=5EB03599',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/46618659_210864363153275_1234599610916345581_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=9vk6ecb-Kj8AX8FcpQf&oh=b100f006759b38c9f388ec041e72475d&oe=5EAFE07B',
            'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/19931721_848477401970258_8018836742020792320_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IE61H6mINZgAX_PnrA6&oh=3144e9cc2a7f697087ff65048e86d311&oe=5EAD808B',
          ],
        },
      ]);
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
