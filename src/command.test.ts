import { describe, expect, test } from 'vitest'
import { run } from './command'

describe('when given url is empty string', () => {
	test('throw Error', () => {
		const url = ''
		expect(() => run(url)).toThrowError('Given url must be fill string')
	})
})

describe('when given url is not github repository url', () => {
	// TODO: add Gitlab url
	test.each([['https://github.com/'], ['https://github.com/mike']])(
		'throw Error',
		(url) => {
			expect(() => run(url)).toThrowError('Support url is github only yet')
		},
	)
})

describe('when given url is github repository url', () => {
	test('return sshCloneUrl with given domain', () => {
		const url = 'https://github.com/mike/repo'
		const result = run(url, { domain: 'mike.github.com' })
		expect(result).toEqual('git@mike.github.com:mike/repo.git')
	})

	test('return sshCloneUrl keeping domain', () => {
		const url = 'https://github.com/mike/repo'
		const result = run(url)
		expect(result).toEqual('git@github.com:mike/repo.git')
	})

	test('return sshCloneUrl with given prefixed', () => {
		const url = 'https://github.com/mike/repo'
		expect(run(url, { prefixDomain: 'pre.' })).toEqual(
			'git@pre.github.com:mike/repo.git',
		)
		expect(run(url, { prefixDomain: 'pre' })).toEqual(
			'git@pregithub.com:mike/repo.git',
		)
	})
})

describe('when given url is ssh url', () => {
	test('return sshCloneUrl with given domain', () => {
		const url = 'git@github.com:mike/repo.git'
		const result = run(url, { domain: 'mike.github.com' })
		expect(result).toEqual('git@mike.github.com:mike/repo.git')
	})

	test('return sshCloneUrl keeping domain', () => {
		const url = 'git@github.com:mike/repo.git'
		const result = run(url)
		expect(result).toEqual('git@github.com:mike/repo.git')
	})

	test('return sshCloneUrl with given prefixed', () => {
		const url = 'git@github.com:mike/repo.git'
		expect(run(url, { prefixDomain: 'pre.' })).toEqual(
			'git@pre.github.com:mike/repo.git',
		)
		expect(run(url, { prefixDomain: 'pre' })).toEqual(
			'git@pregithub.com:mike/repo.git',
		)
	})
})

describe('when given url is repository id name(ex: author/mike)', () => {
	test('return sshCloneUrl with given domain', () => {
		const url = 'mike/repo'
		const result = run(url, { domain: 'mike.github.com' })
		expect(result).toEqual('git@mike.github.com:mike/repo.git')
	})

	test('return sshCloneUrl keeping domain', () => {
		const url = 'mike/repo'
		const result = run(url)
		expect(result).toEqual('git@github.com:mike/repo.git')
	})

	test('return sshCloneUrl with given prefixed', () => {
		const url = 'mike/repo'
		expect(run(url, { prefixDomain: 'pre.' })).toEqual(
			'git@pre.github.com:mike/repo.git',
		)
		expect(run(url, { prefixDomain: 'pre' })).toEqual(
			'git@pregithub.com:mike/repo.git',
		)
	})
})
