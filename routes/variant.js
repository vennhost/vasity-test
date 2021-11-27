const express = require("express");
const db = require("../models");
const Variant = db.variants;
const Product = db.products;
const Op = db.Sequelize.Op;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const variants = await Variant.findAll({
      include: [{ model: Product }],
    });
    if (variants) {
      res.send(variants);
    } else {
      res.send({ message: "Variants not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const variant = await Variant.findByPk(id, {
        include: [{ model: Product }],
      });
      if (variant) {
        res.status(200).send({message: 'Variant found successfully', data: variant});
      } else {
        res.send({ message: "Variant not found" });
      }
    } catch (error) {
      console.log(error);
    }
  });

router.post("/", async (req, res) => {
  try {
    const variant = await Variant.create(req.body);
    res.send(variant);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const variantToDelete = await Variant.destroy({
            where: {id: id}
        })
        if (variantToDelete) {
            res.status(200).send({message: "Variant Deleted successfully"})
        } else {
            res.status(404).send({message: "Variant not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Server Error"})
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const variantToUpdate = await Variant.update(req.body, {
            where: {id: id}
        })
        if (variantToUpdate) {
            res.status(200).send({message: "Variant updated successfully", data: variantToUpdate})
        } else {
            res.status(404).send({message: "Variant not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Server Error"})
    }
})

module.exports = router;
