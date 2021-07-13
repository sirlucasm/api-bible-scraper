module.exports = {
	appInfo: (title, url) => {
		return {
			SCRAPER_TITLE: title,
			SCRAPER_SIMPLE_TITLE: title.toLowerCase().replace(/\s/g, ''),
			SCRAPER_URL: url,
			SCRAPER_TEXT: `<h3>Web Scraper for <a href="${url}">${title}</a></h3>`
		}
	},

	convertToSimpleString: (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
}