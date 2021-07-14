const BibliaApiService = require('../services/BibliaApiService');

const Bibles = require('../configs/bibles.json');
const PouchDB = require('pouchdb');
const db = new PouchDB(`src/database/${BibliaApiService.getAppInfo.SCRAPER_SIMPLE_TITLE}`);

module.exports = {
	index: (req, res) => {
		res.send(BibliaApiService.getAppInfo.SCRAPER_TEXT);
	},

	getAllBooks: async (req, res) => {
		try {
			const { bibleType } = req.params;
			const books = await BibliaApiService.getAllBooks(bibleType);

			db.put(books)
				.then(() => console.log(`saved to ${BibliaApiService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.json(books);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getBooks: async (req, res) => {
		try {
			const { bibleType } = req.params;
			const books = await BibliaApiService.getBooks(bibleType);

			db.put(books)
				.then(() => console.log(`saved to ${BibliaApiService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
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

			const chapters = await BibliaApiService.getChapters(bibleType, book.shortName);
			book._id = 'chapters';
			book.bibleType = bibleType;
			book.chapters = chapters;

			db.put(book)
				.then(() => console.log(`saved to ${BibliaApiService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.json(book);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getVerses: async (req, res) => {
		try {
			const { bibleType, bookName, chapterNumber } = req.params;
			
			const books = await db.get('allBooks');
			const book = books.data.find(data => data.simpleName == bookName);

			const verses = await BibliaApiService.getVerses(bibleType, book.shortName, chapterNumber);
			book._id = 'verses';
			book.chapter = chapterNumber;
			book.verses = verses;

			db.put(book)
				.then(() => console.log(`saved to ${BibliaApiService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			return res.json(book);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},

	getBibles: async (req, res) => {
		try {
			db.put({
				_id: 'bibles',
				data: Bibles 
			})
				.then(() => console.log(`saved to ${BibliaApiService.getAppInfo.SCRAPER_SIMPLE_TITLE}`))
				.catch(console.error);

			const bibles = await db.get('bibles');

			return res.json(bibles);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}
}