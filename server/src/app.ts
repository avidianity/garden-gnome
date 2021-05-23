import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';
import passport from 'passport';
import { errorHandler } from './middlewares';

const app = express();

app.use(json());
app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	})
);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use((_req, res) => {
	return res.status(404).end();
});

app.use(errorHandler);

export default app;
