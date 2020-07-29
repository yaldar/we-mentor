const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({ 
    linkedin_id: String,
    name: String,
    bio: String,
    city: String,
    years: String,
    stack: String,
    technologies: Array, 
    current_job: String,
    role: String,
    preferences: {
        city: String,
        years: String,
        stack: String,
        technologies: Array
    },
    conversations: Array,
});


module.exports = mongoose.model('User', userSchema);
