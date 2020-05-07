const models = require('../../models');
const ApiError = require('../errors/ApiError');
const fs = require('fs');


const getRoute = (req) => {
    const route = req.route ? req.route.path : '' // check if the handler exist
    const baseUrl = req.baseUrl ? req.baseUrl : '' // adding the base url if the handler is child of other handler

    return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route'
}

const FILE_PATH = 'stats.json'

// read json object from file
const readStats = () => {
    let result = {}
    try {
        result = JSON.parse(fs.readFileSync(FILE_PATH))
    } catch (err) {
        console.error(err)
    }
    return result
}

// dump json object to file
const dumpStats = (stats) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' })
    } catch (err) {
        console.error(err)
    }
}

// app.get('/stats/', (req, res) => {
//     res.json(readStats())
// })

module.exports = async (req, res, next) => {
    res.on('finish', () => {
        const stats = readStats()
        const event = `${req.method} ${getRoute(req)} ${res.statusCode}`
        stats[event] = stats[event] ? stats[event] + 1 : 1
        dumpStats(stats)
    })
    next()
};