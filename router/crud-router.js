const express = require(`express`);
const crudController = require(`../controller/crud-controller`);

const router = express.Router();

router.get(`/getAllBooks`, crudController.getAllBooks);

router.get(`/getABook/:id`, crudController.getSingleBook);

router.post(`/addBook`, crudController.addBook);

router.put(`/updateBook/:id`, crudController.updateSingleBooks);

router.delete(`/delete/:id`, crudController.deleteSingleBooks);


module.exports = router;