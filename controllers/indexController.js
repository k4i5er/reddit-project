const redditDb = require('../database/models')
const indexController = {
	index: (req, res) => {
		res.send('index')
	},
	saveToDb: async (req, res) => {
		try{
			await redditDb.Reddit.bulkCreate(req.body)
			res.status(200).send()
		} catch (err) {
			console.log(err);
			res.status(500).send({message: 'Ocurrió un error al guardar en la BD'})
		}
	},
	deleteFromDb: async (req, res) => {
		try {
			await redditDb.Reddit.destroy({
				where: { _id: req.body.id }
			});
			res.status(200).send()
		} catch (err) {
			console.log(err);
			res.status(500).send({message: 'Hubo un problema al eliminar el registro de la BD'})
		}
	},
	getDataFromDb: async (req, res) => {
		try {
			payload = await redditDb.Reddit.findAll({
				order: [['created', 'DESC']]
			})
			res.status(200).send(JSON.stringify(payload))
		} catch (err) {
			res.status(500).send({message: "Hubo un problema al consultar información de la BD"})
		}
	}
}

module.exports = indexController