import { describe, expect, test } from 'vitest'
import { CloneSshUrl, isGithubRepoHttpUrl } from './cloneSshUrl'

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

describe('prefixDomain', () => {
	test.each([
		[
			CloneSshUrl.create('github.com', 'mike', 'example'),
			'pre.',
			'git@pre.github.com:mike/example.git',
		],
		[
			CloneSshUrl.create('github.com', 'mike', 'example'),
			'pre',
			'git@pregithub.com:mike/example.git',
		],
	])('prefix %s with %s', (url, prefix, expected) => {
		const result = CloneSshUrl.prefixDomain(url, prefix)
		expect(result).toBe(expected)
	})
})
