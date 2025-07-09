const { ObjectId } = require("mongodb");
const {connectToDb} = require(`../db`);

  let db;

  connectToDb()
    .then((connection) => {
      db = connection;
    })
    .catch((err) => console.log(err));

  const getBooksCollection = () => db.collection(`books`);


exports.getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limitPointer = parseInt(req.query.limit) || 5;
    const skipPointer = (page - 1) * limitPointer;

    const allBookData = await getBooksCollection()
      .find({})
      .sort({ createdAt: -1 })
      .skip(skipPointer)
      .limit(limitPointer)
      .toArray(); // to convert cursor object into js array

    const totalBooks = await getBooksCollection().countDocuments();

    res.status(200).json({
      data: allBookData,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil(totalBooks / limitPointer),
        totalBooks,
        hasNextPage: page < Math.ceil(totalBooks / limitPointer),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log(`We got ans error: ${error}`)
    res.status(500).json({ message: "Error fetching books" });
  }
};


exports.getSingleBook = async (req, res) => {
  try {
    
    const bookId = req.params.id;

    if(!ObjectId.isValid(bookId)){
      return res.status(400).json({ error : 'Invalid book ID format' });
    };

    const singleBook = await getBooksCollection().findOne({ _id : new ObjectId(bookId) });

    if(!singleBook){
      return res.status(400).json({ error : 'Book not find!' });
    }

    res.status(200).json({
      message : 'Success',
      data: singleBook,
    });

  } catch (error) {
    console.log(`We got ans error: ${error}`)
    res.status(500).json({ message: "Error fetching books" });
  }
};



exports.addBook = async (req, res) => {
    try {
        
        const { title, author, genre, publicationYear, rating } = req.body;

         if (!title || !author || !genre || !publicationYear) {
            return res.status(400).json({ error: 'Title, author, publicationYear and genre are required' });
        };

        const bookData = {
            title,
            author,
            genre,
            publicationYear,
            rating: rating || 3 
        };

        const result = await getBooksCollection().insertOne(bookData);

        const createdBook = await getBooksCollection().findOne({ _id : result.insertedId });

        res.status(201).json({
            message : "Book created successfully",
            data : createdBook
        })

    } catch (error) {
      console.log(`We got ans error: ${error}`)
         res.status(500).json({ message: 'Error fetching books' });
    }
}

exports.updateSingleBooks = async (req, res) => {
  try {
    
    const bookId = req.params.id;
    const updatedData = req.body;

    if(!ObjectId.isValid(bookId)){
      return res.status(400).json({ error : 'Invalid book ID format' });
    };

    const result = await getBooksCollection()
    .updateOne(
      { _id : new ObjectId(bookId) },
      { $set : updatedData }
    );

    if(result.matchedCount === 0){
      return res.status(400).json({ error : 'Book not find!' });
    };

    const updatedBook = await getBooksCollection().findOne({ _id : new ObjectId(bookId) });

    res.status(200).json({
      message : 'Success',
      data: updatedBook,
    });

  } catch (error) {
    console.log(`We got ans error: ${error}`)
    res.status(500).json({ message: "Error fetching books" });
  }
};


exports.deleteSingleBooks = async (req, res) => {
  try {
    
    const bookId = req.params.id;

    if(!ObjectId.isValid(bookId)){
      return res.status(400).json({ error : 'Invalid book ID format' });
    };

    const result = await getBooksCollection().deleteOne({ _id : new ObjectId(bookId) });

    if(result.deletedCount === 0){
      return res.status(400).json({ error : 'Book not find!' });
    };

    res.status(200).json({
      message : 'Book is deleted'
    });

  } catch (error) {
    console.log(`We got ans error: ${error}`)
    res.status(500).json({ message: "Error fetching books" });
  }
};