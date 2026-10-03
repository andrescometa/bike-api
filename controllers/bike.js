let Bike = require('../models/bike')

const controller = {
  getBikes: function (req, res) {
    Bike.find({}).exec()
      .then(bikesList => {
        if (!bikesList) return res.status(404).send({ message: "No data found" })
        return res.status(200).json(bikesList)
      })
      .catch(err => res.status(500).send({ message: `Error: ${err}` }))
  },
  getBike: function (req, res) {
    let bikeId = req.params.id
    if (bikeId == null) return res.status(404).send({ message: "bike not found" })

    Bike.findById(bikeId).exec()
      .then(data => {
        if (!data) return res.status(404).send({ message: "Bike not found" })
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({ message: `Internal error-> ${err}` }))
  },
  saveBike: function (req, res) {
    let bike = new Bike()
    const { brand, model, year, engineCc, riders } = req.body
    if (brand && model) {
      bike.brand = brand
      bike.model = model
      bike.year = year
      bike.engineCc = engineCc
      bike.riders = riders || []

      bike.save()
        .then(storedBike => {
          storedBike
            ? res.status(200).json({ bike: storedBike })
            : res.status(404).send({ message: "Error saving the document" })
        })
        .catch(error => res.status(500).send({ message: "Error while saving the document" }))
    } else {
      return res.status(400).send({ message: "Data is not right" })
    }
  },
  updateBike: function (req, res) {
    let bikeId = req.params.id
    let update = req.body

    Bike.findByIdAndUpdate(bikeId, update, { returnDocument: 'after' })
      .then(updatedBike => {
        if (!updatedBike) return res.status(404).send({ message: "The document does not exist" })
        return res.status(200).send({ bike: updatedBike })
      })
      .catch(error => res.status(500).send({ message: `Error while updating ${error}` }))
  },
  deleteBike: function (req, res) {
    let bikeId = req.params.id

    Bike.findByIdAndRemove(bikeId)
      .then(removedBike => {
        if (!removedBike) return res.status(404).send({ message: "The bike does not exist" })
        return res.status(200).send({ bike: removedBike })
      })
      .catch(err => res.status(500).send({ message: "Error while deleting" }))
  }
}

module.exports = controller