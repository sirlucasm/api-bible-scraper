const {	AppUtils } = require('../utils');
const { SCRAPER_TEXT, SCRAPER_SIMPLE_TITLE, SCRAPER_TITLE, SCRAPER_URL} = AppUtils.appInfo('Biblia API');

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
	getAppInfo: {
		SCRAPER_TEXT,
		SCRAPER_SIMPLE_TITLE,
		SCRAPER_TITLE,
		SCRAPER_URL
	},

	getBooks: async (bibleType) => {
		try {
			const { data } = await axios.get(`${SCRAPER_URL}/${bibleType}/index`);
			const $ = cheerio.load(data);

			const books = [];
			let book = {};

			$('.jss3 li').each((index, element) => {
				let name = $(element.children).text();
				book = {
					id: index,
					name,
					testament: index < 39 ? 'old' : 'new',
					shortName: $(element.children).attr().href.split(`${bibleType}/`)[1],
					simpleName: AppUtils.convertToSimpleString(name)
				};
				books.push(book);
			});

			return books;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	getChapters: async (bibleType, bookShortName) => {
		try {
			const { data } = await axios.get(`${SCRAPER_URL}/${bibleType}/${bookShortName}`);
			const $ = cheerio.load(data);

			const chapters = [];
			let chapter = {};

			$('.jss1 li').each((index, element) => {
				let chapterNumber = $(element.children).text().trim();
				chapter = {
					number: chapterNumber,
				}
				chapters.push(chapter);
			});

			return chapters;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	getVerses: async (bibleType, bookShortName, chapterNumber) => {
		try {
			const { data } = await axios.get(`${SCRAPER_URL}/${bibleType}/${bookShortName}/${chapterNumber}`);
			const $ = cheerio.load(data);

			const chapters = [];
			let chapter = {};

			$('.jss40 .jss43').each((index, element) => {
				let verseNumber;
				verseNumber = $(element.children[0]).text().trim();
				verseText = $(element).html().split('<!-- -->')[1];

				chapter = {
					number: verseNumber,
					text: verseText,
				}
				chapters.push(chapter);
			});

			return chapters;
		} catch (error) {
			return Promise.reject(error);
		}
	},
}