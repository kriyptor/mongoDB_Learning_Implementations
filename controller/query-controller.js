const { ObjectId } = require("mongodb");
const { getDb } = require(`../db`);
/* 
  let db;

  connectToDb()
    .then((connection) => {
      db = connection;
    })
    .catch((err) => console.log(err)); */

  const getBooksCollection = () => getDb().collection(`books`);

/* exports.getQueriedBooks = async (req, res) => {
    try {  
        const queryList = {};

        if(req.query.author) queryList.author = new ObjectId(req.query.author);
        if(req.query.genre) queryList.genre = req.query.genre;
        if(req.query.publicationYear) queryList.publicationYear = parseInt(req.query.publicationYear);

        const books = await getBooksCollection().find(queryList).toArray();

        res.status(200).json({
            message : "success",
            data : books
        })

    } catch (error) {
     console.log(`We got ans error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
} */

exports.getQueryTitle = async (req, res) => {
    try {  
        
        const title = req.params.title;

        const books = await getBooksCollection().find({
            title : { $regex : title }
        }).toArray();

        res.status(200).json({
            message : "success",
            count : books.length,
            data : books
        })

    } catch (error) {
     console.log(`We got ans error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}


exports.getQueryGenre = async (req, res) => {
    try {  
        
        const genre = req.params.genre;

        const books = await getBooksCollection().find({
            genre : { $regex : genre }
        }).toArray();

        res.status(200).json({
            message : "success",
            count : books.length,
            data : books
        })

    } catch (error) {
     console.log(`We got ans error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}


exports.getQueryMoreFilter = async (req, res) => {
    try {  

        const { genre, author, minYear, maxYear, rating } = req.query;

        const queryFilter = {};

        if(genre){
            queryFilter.genre = { $regex : genre }
        }

        if(author){
            queryFilter.author = { $regex : author }
        }

        if (minYear || maxYear) {
          queryFilter.publicationYear = {};
          if (minYear) queryFilter.publicationYear.$gte = parseInt(minYear);
          if (maxYear) queryFilter.publicationYear.$lte = parseInt(maxYear);
        }

        if(rating){
            queryFilter.rating = {};
            queryFilter.rating.$gte = parseFloat(rating);
        }

        //console.log(queryFilter);

        const books = await getBooksCollection().find(queryFilter).toArray();

        res.status(200).json({
            message : "success",
            count : books.length,
            data : books
        })

    } catch (error) {
     console.log(`We got ans error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}


exports.getQueryPreDefFilter = async (req, res) => {
    try {  

        const results = {};

        results.fantasyOrSciFi = await getBooksCollection().find({
            genre : { $in : ['Autobiography', 'Finance'] }
        }).toArray();

        results.nonFiction = await getBooksCollection().find({
            genre: { $ne: 'Fiction' }
        }).toArray();

        results.modernBooks = await getBooksCollection().find({
            publicationYear : { $gte : 2000 }
        }).toArray();

        results.highRatedBook = await getBooksCollection().find({
            rating : { $gt : 4.7 }
        }).toArray();

        res.status(200).json({
            message : "success",
            data : {
                fantasyOrSciFi: { count: results.fantasyOrSciFi.length, books: results.fantasyOrSciFi },
                modernBooks: { count: results.modernBooks.length, books: results.modernBooks },
                nonFiction: { count: results.nonFiction.length, books: results.nonFiction },
                highRatedBook : { count: results.highRatedBook.length, books: results.highRatedBook }
            }
        })

    } catch (error) {
     console.log(`We got ans error: ${error}`)
        res.status(500).json({ message: 'Error fetching books' });
    }
}
