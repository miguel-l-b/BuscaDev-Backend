const socketio = require('socket.io')

const parseStringAsArray = require('./utils/parseStringAsArray')
const CalculateDistances = require('./utils/CalculateDistances')

let io
const connections = []

exports.setupWebsocket = (server) => {
    io = socketio(server)

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })
    })
}

exports.fiendConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return CalculateDistances(coordinates, connection.coordinates) <10
            && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, massage, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    });
}