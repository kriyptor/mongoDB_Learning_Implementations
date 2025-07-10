const express = require(`express`);
const aggreController = require(`../controller/aggre-controller`);

const router = express.Router();

router.get(`/get/genre-count`, aggreController.getGenreCount);

router.get(`/get/avg-rating`, aggreController.getAvgRating);

router.get(`/get/pub-year-count`, aggreController.getPubYearBookCount);

 router.get(`/get/high-rated-recent-book`, aggreController.getHighRatedAndRecentBooks);


module.exports = router;