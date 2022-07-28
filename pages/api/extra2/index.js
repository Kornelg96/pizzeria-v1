import dbConnect from '../../../Utils/mongo';
import ExtraOptions from '../../../models/ExtraOptions'
export default async function handler(req, res) {
    const { method } = req;
    dbConnect()
    if (req.method === 'GET') {
        try {
            const extra = await ExtraOptions.find()
            res.status(200).json(extra)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === "POST") {
        try {
            const extra = await ExtraOptions.create(req.body);
            res.status(201).json(extra)
        } catch (error) {
            res.status(500).json(error);
        }
    }
}