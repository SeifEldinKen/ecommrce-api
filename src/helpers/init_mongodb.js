const mongoose = require('mongoose')


const initMongodb = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost/store_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Mongodb Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(error)
    }
}


module.exports = initMongodb()