
import Product from '../../../models/Product'
import dbConnect from '../../../Utils/mongo';
export default async function handler(req, res) {
    const {
         method,
         query:{id},
         } = req;
    dbConnect()
    if (req.method === 'GET') {
        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "POST") {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product)
        } catch (error) {
            res.status(500).json(error);
        }
    }
}