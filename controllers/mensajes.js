const { response } = require('express');
const Mensajes= require('../models/mensaje')


const obtenerChat= async(req,res)=>{
    //cual es mi id
    const miId= req.uid;
    const mensajeDe= req.params.de;

    // cargo los ultimos 30 mensajes
    const last30= await Mensajes.find({
        $or:[{de:miId,para:mensajeDe},{de:mensajeDe,para:miId}]
    })
    .sort({createdAt:'desc'})
    .limit(30);
    res.json({
        ok:true,
        mensajes:last30
    })

}

module.exports={
    obtenerChat
}