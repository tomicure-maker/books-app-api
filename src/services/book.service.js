import { Book } from "../models/Book.js";

export const findBooks = async (req,res)=>{
    const books = await Book.findAll();
    res.json(books);
};

export const findBook = (req,res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book)
        res.status(404).send({message: "Book not found"});
    res.json(book);
};

export const createBook =  (req, res) => {

    const {title, author, rating, pageCount, summary, imageUrl, available} = req.body;
    if (!title || !author)
        res.status(400).send({message: "Title and author fields are required"});
    const newBook = await Book.create({title, author, rating, pageCount, summary, imageUrl, available});
    res.json(newBook);
    res.send("Creando libro");
}

export const updateBook = (req, res)=>{
    const {id} = req.params;
    const {title, author, rating, pageCount, summary, imageUrl, available} = req.body;

    const book = await Book.findByPk(id);
    if (!book)
        res.status(404).send({message: "Book not found"});

    await book.update({title, author, rating, pageCount, summary, imageUrl, available});
    await book.save();
    res.json(book); 
    res.send("Actualizando libro");
};

export const deleteBook = (req,res) =>{
    const {id} = req.params;
    const book = await Book.findByPk(id);
    if (!book)
        res.status(404).send({message: "Book not found"});
    await book.destroy();

    res.send("Borrando libro");
}