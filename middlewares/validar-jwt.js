const jwt = require('jsonwebtoken');


const validarJWT = ( req, res , next) => {

    //lo primero que tengo que hacer es leer el token
    // leo el header y busco el "x-token"
    const token = req.header('x-token');
    //si no hay token !token no retorno nada
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion'
        });
    };

    try{
        const {uid}=jwt.verify(token,process.env.JWT_KEY);
        req.uid = uid;

        next();
    }catch (error){
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }
    

}

module.exports={
    validarJWT
}