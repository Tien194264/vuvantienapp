import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRouter from './routes/posts.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postsRouter);
app.get('/', (req, res) => {
	res.send('Hello ');
});
const PORT = process.env.PORT;

mongoose
	.connect(process.env.URL_DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	.then(() =>
		app.listen(PORT, () => {
			console.log('Connect database successfully!!');
		}),
	)
	.catch((err) => {
		console.log('Connect database error: ' + err.message);
	});
