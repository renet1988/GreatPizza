let controllerModel = require('../../models/pizzaModel');
let modelName = 'Pizzas';

/**
 * pizzasController.js
 *
 * @description :: Server-side logic for managing pizzas.
 */
module.exports = {

    /**
     * pizzasController.get()
     */
    get: async (req, res) => {
        try {
            if (req.params.id) {
                let item = await controllerModel.findOne({ _id: req.params.id });
                if (!item) {
                    return res.status(404).json({
                        message: 'No such ' + modelName
                    });
                }
                return res.status(200).json(item);
            } else {
                let items = await controllerModel.find();
                res.status(200).send(items);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    /**
     * pizzasController.post()
     */
    post: async (req, res) => {
        let item = new controllerModel(req.body);
        try {
            let newItem = await item.save();
            return res.status(201).json(newItem);
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(new library.Error('Duplicate key', [err.message]));
            }
            res.status(500).send(err);
        }
    },

    /**
     * pizzasController.put()
     */
    put: async (req, res) => {
        try {
            let item = await controllerModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (!item) {
                return res.status(404).send(new library.Error('Not Found Error', [modelName + ' with id ' + req.params.id + ' not found']));
            } else {
                res.status(200).send(item);
            }
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(new library.Error('Duplicate key', [err.message]));
            }
            res.status(500).send(new library.Error('Unknown Server Error', ['Unknow server error when updating ' + modelName + ' with id ' + req.params.userId]));
        }
    },

    /**
     * pizzasController.delete()
     */
    delete: async (req, res) => {
        try {
            let item = await controllerModel.findOneAndRemove({ _id: req.params.id });
            if (!item) {
                return res.status(404).send(new library.Error('Not Found Error', [modelName + ' with id ' + req.params.id + ' not found']));
            } else {
                res.status(204).send(modelName + ' successfully deleted');
            }
        } catch (err) {
            return res.status(500).send(new library.Error('Unknown server error', ['Unknown server error when trying to delete ' + modelName + ' with id ' + req.params.id]));
        }
    }
    
};
