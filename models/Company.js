const mongoose = require('mongoose');

const Companyschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cordinates:{
        latitude:{
            type:Number,
            required:true
        },
        longitude:{
            type:Number,
            required:true
        }
    },
    zoneCordinates: [
        {
            ZoneName: {
                type: String,
                required: true
            },
            cordinateList:[
                {
                    latitude: {
                        type: Number,
                        required: true
                    },
                    longitude: {
                        type: Number,
                        required: true
                    }
                },

            ],
            Sector:{
                type:String,
                required:true
            }
        }
    ]
})

const Company = mongoose.model('Company',Companyschema);
module.exports= Company;