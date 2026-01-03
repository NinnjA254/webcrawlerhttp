const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
	try {
		const baseURLObj = new URL(baseURL)
		const currentURLObj = new URL(currentURL)
		const normalizedCurrentURL = normalizeURL(currentURL)

		if (pages[normalizedCurrentURL] > 0) {
			pages[normalizedCurrentURL]++
			return pages
		}

		pages[normalizedCurrentURL] = 1
		console.log(`actively crawling: ${currentURL}`)

		if (baseURLObj.hostname !== currentURLObj.hostname) {
			return pages
		}

		const res = await fetch(currentURL)
		if (!res.ok) {
			console.log(`error in fetch with status code: ${res.status} on page: ${currentURL}`)
			return pages
		}
		const contentType = res.headers.get("content-type")
		if (!contentType.includes("text/html")) {
			console.log(`non-html response, content type: ${contentType} on page: ${currentURL}`)
			return pages
		}

		const htmlBody = await res.text()
		const nextURLs = getURLsFromHTML(htmlBody, baseURL)
		for (const nextURL of nextURLs) {
			pages = await crawlPage(baseURL, nextURL, pages)
		}
	} catch (err) {
		console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
	}
	return pages
}
function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody)
	const linkElements = dom.window.document.querySelectorAll('a')
	const urls = []
	for (const linkElement of linkElements) {
		let link = linkElement.href
		if (link.startsWith('/')) {
			link = `${baseURL}${link}`
		}
		try { //checkin to see if di link is valid
			new URL(link)
			urls.push(link)
		} catch (err) {
			console.log(`Invalid url: ${link}`)
		}
	}
	return urls
}
function normalizeURL(urlString) {
	const urlObj = new URL(urlString)
	const hostPath = `${urlObj.hostname}${urlObj.pathname}`
	if (hostPath.length > 0 && hostPath[hostPath.length - 1] === '/') {
		return hostPath.slice(0, -1)
	}
	return hostPath
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage
}
