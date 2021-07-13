const BibliaOnlineService = require('../services/BibliaOnlineService');

const { AppUtils } = require('../utils');
const PouchDB = require('pouchdb');
const db = new PouchDB(`src/database/${BibliaOnlineService.getAppInfo.SCRAPER_SIMPLE_TITLE}`);

module.exports = {
	index: (req, res) => {
		res.send(BibliaOnlineService.getAppInfo.SCRAPER_TEXT);
	},

	getAllBooks: async (req, res) => {
		try {
			const { bibleType } = req.params;
			const books = await BibliaOnlineService.getAllBooks(bibleType);

			db.put(books)
				.then(() => console.log(`saved to ${BibliaOnlineService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.json(books);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getBooks: async (req, res) => {
		try {
			const { bibleType } = req.params;
			const books = await BibliaOnlineService.getBooks(bibleType);

			db.put(books)
				.then(() => console.log(`saved to ${BibliaOnlineService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.json(books);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getChapters: async (req, res) => {
		try {
			const { bibleType, bookName } = req.params;
			
			const books = await db.get('allBooks');
			const book = books.data.find(data => data.simpleName == bookName);

			const chapters = await BibliaOnlineService.getChapters(bibleType, book.shortName);
			book._id = 'chapters';
			book.bibleType = bibleType;
			book.chapters = chapters;

			db.put(book)
				.then(() => console.log(`saved to ${BibliaOnlineService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.send(book);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getVerses: async (req, res) => {
		try {
			const { bibleType, bookName, chapterNumber } = req.params;
			
			const books = await db.get('allBooks');
			const book = books.data.find(data => data.simpleName == bookName);

			const verses = await BibliaOnlineService.getVerses(bibleType, book.shortName, chapterNumber);
			book._id = 'verses';
			book.chapter = chapterNumber;
			book.verses = verses;

			db.put(book)
				.then(() => console.log(`saved to ${BibliaOnlineService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.send(book);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}
}