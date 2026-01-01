const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { expect, test } = require('@jest/globals')

test("normalizeUrl strip protocol", () => {
	const input = 'https://blog.boot.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test("normalizeUrl strip trailing slash", () => {
	const input = 'https://blog.boot.dev/path/'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test("normalizeUrl capitals", () => {
	const input = 'https://blog.BOOT.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test("normalizeUrl strip http", () => {
	const input = 'http://blog.boot.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test("getUrlsFromHTML absolute", () => {
	const inputHTMLBody = `
<html>
	<body>
		<a href='https://blog.boot.dev/about/'>about</a>
	</body>
</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
	const expected = ['https://blog.boot.dev/about/']
	expect(actual).toEqual(expected)
})

test("getUrlsFromHTML relative", () => {
	const inputHTMLBody = `
<html>
	<body>
		<a href='/about/'>Boot.dev blog</a>
	</body>
</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
	const expected = ['https://blog.boot.dev/about/']
	expect(actual).toEqual(expected)
})

test("getUrlsFromHTML both", () => {
	const inputHTMLBody = `
<html>
	<body>
		<a href='/about/'>about</a>
		<a href='https://blog.boot.dev/about/'>about</a>
	</body>
</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
	const expected = ['https://blog.boot.dev/about/', 'https://blog.boot.dev/about/']
	expect(actual).toEqual(expected)
})


test("getUrlsFromHTML invalid", () => {
	const inputHTMLBody = `
<html>
	<body>
		<a href='invalid'>Invalid</a>
	</body>
</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
	const expected = []
	expect(actual).toEqual(expected)
})
