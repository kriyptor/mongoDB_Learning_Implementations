const express = require(`express`);
const queryController = require(`../controller/query-controller`);

const router = express.Router();

router.get(`/get/search/title/:title`, queryController.getQueryTitle);

router.get(`/get/search/genre/:genre`, queryController.getQueryGenre);

router.get(`/get/search/filter`, queryController.getQueryMoreFilter);

router.get(`/get/search/predefined`, queryController.getQueryPreDefFilter);


module.exports = router;