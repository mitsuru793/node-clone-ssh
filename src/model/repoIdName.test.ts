import { describe, expect, test } from 'vitest'
import { RepoIdName } from './repoIdName'

describe('isRepoIdName', () => {
	test.each([
		[true, 'mike/repo'],

		[false, 'mike/repo/README.md'],

		[false, '/mike/repo'],
		[false, 'mike/repo/'],
		[false, '/mike/repo/'],

		[false, 'repo'],
		[false, '/repo'],
		[false, 'repo/'],
		[false, '/repo/'],
	])('return %o when given %s', (expected, input) => {
		const result = RepoIdName.is(input)
		expect(result).toBe(expected)
	})
})
