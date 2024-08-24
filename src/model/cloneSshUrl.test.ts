import { describe, expect, test } from 'vitest'
import { isGithubRepoHttpUrl } from './cloneSshUrl'

describe('isGithubRepoHttpUrl', () => {
	test.each([
		[true, 'https://github.com/mike/example'],

		[false, 'https://github.com'],
		[false, 'https://github.com/mike'],
		[false, 'https://github.com/mike/example/README.md'],
	])('return %o when given %s', (expected, urlRaw) => {
		const url = new URL(urlRaw)
		const result = isGithubRepoHttpUrl(url)
		expect(result).toBe(expected)
	})
})
