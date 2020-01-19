const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

const { fiendConnections, sendMessage } = require('../websocket')

module.exports = {
    async index(req, res) {
        
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const {  github_username, techs, latitude, longitude  } = req.body

        let dev = await Dev.findOne({ github_username })

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
             const {  name = login, avatar_url, bio  } = apiResponse.data
    
            const techsArray = parseStringAsArray(techs)
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const SendSocketMessageTo = fiendConnections({
                latitude,
                longitude
            }, 
            techsArray,
            )

            sendMessage(SendSocketMessageTo, 'new-dev', dev)
        }
       
        return res.json(dev)
    }
}