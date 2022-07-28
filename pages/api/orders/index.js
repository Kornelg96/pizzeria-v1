import dbConnect from '../../../Utils/mongo'
import Orders from '../../../models/Orders'
export default async function handler(req, res) {
    dbConnect()
    if (req.method === 'GET') {
        try {
            const orders = await Orders.find();
            res.status(201).json(orders)
                    } catch (error) {
            res.status(500).json(error);
                    }
     }
    if (req.method === 'POST') {
        try {
const order = await Orders.create(req.body);
res.status(201).json(order)
        } catch (error) {
res.status(500).json(error + "dupa");

        }
    }
}