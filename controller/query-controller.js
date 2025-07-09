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