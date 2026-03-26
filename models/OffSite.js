const mongoose = require('mongoose');

const offSiteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    cordinatates:{
        lat:{
            type:Number,
            required: true
        },
        lng:{
            type:Number,
            required: true
        }
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    timeLine:{
        startDate:{
            type: Date,
            required: true,
        },
        endDate:{
            type: Date,
            required:true, 
        },
    },
    radius:{
        type:Number, 
        default: 200
    }
});

const OffSite = mongoose.model('OffSite', offSiteSchema);
module.exports = OffSite;
