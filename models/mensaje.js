

const {Schema, model, models}= require('mongoose');

const MensajeSchema=Schema({
    de:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    para:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    mensaje:{
        type:String,
        requi:true
    }
    
},{
    timestamps:true,
});

MensajeSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    return object;
})

module.exports = model('Mensajes',MensajeSchema);