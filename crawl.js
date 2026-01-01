const { JSDOM } = require('jsdom')

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
	getURLsFromHTML
}
