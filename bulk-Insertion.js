const { connectToDb } = require(`./db`);

  let db;
  
  connectToDb()
    .then((connection) => {
      db = connection;
    })
    .catch((err) => console.log(err));

  const getBooksCollection = () => db.collection(`books`);

  // Sample book data
const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    publicationYear: 2018,
    rating: 4.8
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publicationYear: 1949,
    rating: 4.7
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    publicationYear: 1960,
    rating: 4.9
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    publicationYear: 1988,
    rating: 4.6
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    publicationYear: 2011,
    rating: 4.8
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    genre: "Business",
    publicationYear: 2011,
    rating: 4.5
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    publicationYear: 2016,
    rating: 4.7
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    publicationYear: 2020,
    rating: 4.8
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    publicationYear: 2011,
    rating: 4.6
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    genre: "Finance",
    publicationYear: 1997,
    rating: 4.7
  }
];

exports.insertBookData = async () => {
    try {
        const result = await getBooksCollection().insertMany(books);
        console.log(`✅ Inserted ${result.insertedCount} books.`);
    } catch (error) {
        console.error('Error inserting books:', err);
    }
}