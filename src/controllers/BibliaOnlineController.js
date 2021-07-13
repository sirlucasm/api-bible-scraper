const axios = require('axios');
const cheerio = require('cheerio');

const {
	AppUtils
} = require('../utils');

const { CRAWLER_TEXT, CRAWLER_URL } = AppUtils.appInfo('Biblia Online', 'https://bibliaonline.com.br');

module.exports = {
	index: (req, res) => {
		res.send(CRAWLER_TEXT);
	},

	getBooks: async (req, res) => {
		try {
			const { data } = await axios.get(`${CRAWLER_URL}/ara/index`);
			const $ = cheerio.load(data);
			const books = {};

			$('.jss3 li').each((index, element) => {
				console.log(index);
				books.name = $(element.children).text();
			});

			return res.json(books);
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}
}