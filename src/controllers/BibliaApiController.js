const BibliaApiService = require('../services/BibliaApiService');

const Bibles = require('../database/Bibles.json');

const fs = require('fs');

const PATH = `src/database/`;

module.exports = {
	index: (req, res) => {
		res.send(BibliaApiService.getAppInfo.SCRAPER_TEXT);
	},

	getBooks: async (req, res) => {
		try {
			const fileName = 'Books';
			const { bibleType } = req.params;
			const books = await BibliaApiService.getBooks(bibleType);

			fs.writeFileSync(`${PATH}${fileName}.json`, JSON.stringify(books));

			return res.json(books);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getChapters: async (req, res) => {
		try {
			const fileName = 'Chapters';
			const { bibleType, bookName } = req.params;
			
			const books = require(`../database/Books.json`);
			const book = books.find(data => data.simpleName == bookName);

			const chapters = await BibliaApiService.getChapters(bibleType, book.shortName);

			fs.writeFileSync(`${PATH}${fileName}.json`, JSON.stringify(chapters));

			return res.json(chapters);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getVerses: async (req, res) => {
		try {
			const fileName = 'Verses';
			const { bibleType, bookName, chapterNumber } = req.params;
			
			const books = require(`../database/Books.json`);
			const book = books.find(data => data.simpleName == bookName);

			const verses = await BibliaApiService.getVerses(bibleType, book.shortName, chapterNumber);

			fs.writeFileSync(`${PATH}${fileName}.json`, JSON.stringify(verses));

			return res.json(verses);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getBibles: async (req, res) => {
		try {
			return res.json(Bibles);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}
}