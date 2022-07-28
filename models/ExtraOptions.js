import mongoose from "mongoose";

const extraSchema = new mongoose.Schema(
  {
    category:{
        type: [
            {
                title: {type:String},
                subCategory:[
                    {
                        subTitle: {type:String},
                        price:{type:Number}

                    },
                ]
            }
        ]
    },
  },
  { timestamps: true }
);

export default mongoose.models.ExtraOptions2 ||
  mongoose.model("ExtraOptions2", extraSchema);