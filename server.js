const express = require('express');
const Allbooks = require('./connect');
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//routes


app.get('/', (req, res) => {
    Allbooks.find({}).then((result) => {
        console.log('====================================');
        console.log("res", result);
        console.log('====================================');
        res.send(result)
    });
})

app.post('/submit', (req, res) => {
    const { book, author, summary } = req.body;
    console.log('====================================');
    console.log(
        'huhhuh', book, author, summary);
    console.log('====================================');

    const newBook = new Allbooks({ title: book, author: author, summary: summary });
    newBook.save()
        .then((result) => {
            console.log('New book added:', result);
            res.status(200).json({ message: 'Book added successfully', book: result });
        })
        .catch((error) => {
            console.error('Error adding new book:', error);
            res.status(500).json({ error: 'Failed to add new book' });
        });

})

app.post('/edit', async (req, res) => {
    const { book, author, summary, dataid } = req.body;
    console.log('====================================');
    console.log(
        'huhhuh', book, author, summary, dataid);
    console.log('====================================');

    const data = await Allbooks.findByIdAndUpdate({ _id: dataid }, { title: book, author: author, summary: summary });

    if (data) {
        console.log('edit data:', data);
        res.send('Data edit successfully');
    } else {
        res.status(404).send('Data not found');
    }


})





app.post('/delete', async (req, res) => {
    const data = req.body;
    try {
        const datadelete = await Allbooks.findOneAndDelete({ _id: data.id });
        if (datadelete) {
            console.log('Deleted data:', datadelete);
            res.send('Data deleted successfully');
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data');
    }



})

app.post('/view', async (req, res) => {
    const data = req.body;
    try {
        const datadelete = await Allbooks.findById({ _id: data.id })  .then((result) => {
            console.log('New book added:', result);
            res.status(200).json({ message: 'Book added successfully', book: result });
        })
        .catch((error) => {
            console.error('Error adding new book:', error);
            res.status(500).json({ error: 'Failed to add new book' });
        });
       
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data');
    }



})


app.listen(5000, () => {
    console.log('====================================');
    console.log('Node api');
    console.log('====================================');
})

