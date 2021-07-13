module.exports = {
	appInfo: (title, url) => {
		return {
			CRAWLER_TITLE: title,
			CRAWLER_URL: url,
			CRAWLER_TEXT: `<h3>Web Crawler for <a href="${url}">${title}</a></h3>`
		}
	}
}