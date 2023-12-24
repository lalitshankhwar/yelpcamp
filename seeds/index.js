const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelpApp')
    .then(() => console.log("Mongoose Connected"))
    .catch(err => console.log(err));

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR ID Lalit
            author: '657ed1a14ea3df385e9c2536',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dye3gidys/image/upload/v1703175551/YelpCamp/yr6nwtuahpgjoas91fsh.jpg',
                    filename: 'YelpCamp/yr6nwtuahpgjoas91fsh'
                },
                {
                    url: 'https://res.cloudinary.com/dye3gidys/image/upload/v1703175550/YelpCamp/gilr3cdslolvksuemec4.jpg',
                    filename: 'YelpCamp/gilr3cdslolvksuemec4'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugiat vero dignissimos est exercitationem ratione, neque doloremque cupiditate impedit id voluptates?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})