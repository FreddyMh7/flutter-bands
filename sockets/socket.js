const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Los Acosta'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Metallica2'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente conectado")

    client.emit('active-bands', bands.getBands())

    client.on('disconnect', () => { console.log("Cliente desconectado") });

    client.on('mensaje', (payload) =>{
        console.log("Mensaje!!!", payload);

        io.emit("mensaje", {admin: 'nuevo mensaje'});
      });

      client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
      });

      client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
      });

      client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());
      });

      client.on('nuevo-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload); Emite a todos los usuarios
        client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos al que lo emite
      });


  });
