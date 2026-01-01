const { normalizeURL } = require('./crawl.js')
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
