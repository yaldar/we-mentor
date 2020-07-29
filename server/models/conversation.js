const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema(
    { 
        message: String,
        name: String
    }
)

const conversationSchema = new mongoose.Schema({ 
    conversation_id: String,
    participants: Array,
    messages: [messageSchema]
});



module.exports = mongoose.model('Conversation', conversationSchema);
