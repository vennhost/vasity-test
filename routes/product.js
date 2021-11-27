const express = require("express");
const db = require("../models");
const Product = db.products;
const Variant = db.variants;
const Op = db.Sequelize.Op;

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const products = await Product.findAll({
            include: [{ model: Variant }],
        });
         if (products) {
             res.status(200).send({message: 'Product found successfully', data: products})
         } else {
             res.status(404).send({message: 'Product not found'})
         } 
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id, {
            include: [{ model: Variant }],
        });
         if (product) {
             res.status(200).send({message: 'Product found successfully', data: product})
         } else {
             res.status(404).send({message: 'Product not found'})
         } 
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const productToDelete = await Product.destroy({
            where: {id: id}
        })
        if (productToDelete) {
            res.status(200).send({message: "Product Deleted successfully"})
        } else {
            res.status(404).send({message: "Product not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Server Error"})
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const productToUpdate = await Product.update(req.body, {
            where: {id: id}
        })
        if (productToUpdate) {
            res.status(200).send({message: "Product updated successfully", data: productToUpdate})
        } else {
            res.status(404).send({message: "Product not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Server Error"})
    }
})

module.exports = router;
