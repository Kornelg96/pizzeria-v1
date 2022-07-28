import dbConnect from '../../../Utils/mongo'
import Orders from '../../../models/Orders'

export default async function handler(req, res) {
    const { method, query: { id }, } = req
    dbConnect()
    if (method === 'GET') {
        try {
            const order = await Orders.findById(id);
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'POST') {
        try {
            const order = await Orders.create(req.body);
            res.status(201).json(order)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'PUT') {
        try {
            const order = await Orders.create(req.body);
            res.status(201).json(order)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === 'DELETE') {
        try {
            const order = await Orders.create(req.body);
            res.status(201).json(order)
        } catch (error) {
            res.status(500).json(error);
        }
    }


}