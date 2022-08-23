const { request } = require('express')
const express  = require('express')
const router = express.Router()
const ProductsService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const { getProductSchema, uptadeProductSchema, createProductSchema  } = require('../schemas/product.schema')



const service = new ProductsService()



router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id);
      res.json(product)
    } catch (error) {
      next(error)
    }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    newProduct = await service.creat(body)
    res.status(201).json(newProduct)
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(uptadeProductSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) {
    next(erorr)
  }

})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const product = await service.delete(id)
  res.json(product)
})

module.exports = router
