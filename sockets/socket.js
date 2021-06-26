const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado,usarioDesconectado, usuarioDesconectado, grabarMensaje}= require('../controllers/socket')


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    //imprimo el handshake ... esto me trae todo al header
    console.log(client.handshake.headers['x-token']);

    //ahora valido ese token (en helpers)
    const[valido,uid]= comprobarJWT(client.handshake.headers['x-token']);
    console.log(valido,uid);

    //verifico si el cliente esta autenticado
    if (!valido){return client.disconnect();}
    console.log('cliente autenticado');

    //cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala en particular
    // hay dos salas : sala global, cliente.id, pero voy a usar el uid de la base
    //para unir la persona a la sala del uid hago
    client.join(uid);

    //escucho el mensaje personal
    client.on('mensaje-personal',async(payload)=>{
        //grabo el mensaje en la base de datos
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload);
    })
    

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });


    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
