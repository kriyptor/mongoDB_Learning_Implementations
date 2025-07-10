const { getDb } = require(`../db`);

const getBooksCollection = () => getDb().collection(`books`);

exports.getGenreCount = async (req, res) => {
    try {  

        const pipeline = [
          {
            $group: {
              _id: "$genre", //group by genre
              count: { $sum: 1 }, //count how many in each genre by adding 1 for every count
            },
          },
          {
            $sort: { count: -1 }, // sort by number of books in desc
          },
        ];

        const books = await getBooksCollection().aggregate(pipeline).toArray();

        res.status(200).json({
            message : "success",
            data : books
        })

    } catch (error) {
        console.log(`We got an error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}


exports.getAvgRating = async (req, res) => {
    try {  

        const pipeline = [
          {
            $group: {
              _id: "$genre", // grouping by genre field, aggr all document
              avgRating: { $avg: "$rating" }, //Calculate average of the 'rating' field
            },
          },
          {
            $project : {
                _id : 1,
                AvgRating : { $round : ["$avgRating", 2] } // aliasing avgRating => AvgRating & rounding off to 2 decimal
            }
          },
        ];

        const books = await getBooksCollection().aggregate(pipeline).toArray();

        res.status(200).json({
            message : "success",
            data : books
        })

    } catch (error) {
        console.log(`We got an error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}


/* -------------- Moderate complex Aggregation --------------- */

exports.getPubYearBookCount = async (req, res) => {
    try {  

        const pipeline = [
          {
            $group: {
              _id: "$publicationYear", // grouping by genre field, aggr all document
              avgRating: { $avg: "$rating" }, //Calculate average of the 'rating' field
              bookCount : { $sum : 1 }
            },
          },
          {
             $match : {
              bookCount : { $gt : 1 } // filter out count < 2
             }
          },
          {
            $project : {
                _id : 0, // don'y show year as id
                year : "$_id", // alias year as _id that is publish year
                AvgRating : { $round : ["$avgRating", 2] }, // aliasing avgRating => AvgRating & rounding off to 2 decimal
                bookCount : 1 // show bookcount
            }
          },
        ];

        const books = await getBooksCollection().aggregate(pipeline).toArray();

        res.status(200).json({
            message : "success",
            data : books
        })

    } catch (error) {
        console.log(`We got an error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}


exports.getHighRatedAndRecentBooks = async (req, res) => {
    try {  

       //Use $facet to get multiple results in one go
        const pipeline = [
          {
            $facet: {
              highRated: [
                { $match: { rating: { $gt: 4.7 } } }, //find books with rating > 4.7
                { $project: { _id: 0, title: 1, rating: 1, author: 1 } }, // select & show only title and rating
                { $sort: { rating: -1 } }, // sort in desc by rating
              ],
              recentBooks: [
                { $match: { publicationYear: { $gte: 2015 } } }, //find books with publicationYear >= 2015
                {
                  $project: { _id: 0, title: 1, rating: 1, publicationYear: 1 },
                }, // select & show only title, ting & publicationYear
                { $sort: { publicationYear: -1 } }, // sort in desc by publicationYear
              ],
            },
          },
        ];

        const books = await getBooksCollection().aggregate(pipeline).toArray();

        res.status(200).json({
            message : "success",
            data : books
        })

    } catch (error) {
        console.log(`We got an error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}