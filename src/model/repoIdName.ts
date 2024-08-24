import { assert } from '@sindresorhus/is'

export type RepoIdName = string

const regexp = new RegExp('^([^/]+)/([^/]+)$')

export function isRepoIdName(url: string): url is RepoIdName {
	return regexp.test(url)
}

export function parseRepoIdName(url: RepoIdName): [string, string] {
	const matched = url.match(regexp)
	if (!matched) {
		throw new Error('Not match RepoIdName')
	}

	const [_, author, repoName] = matched
	assert.nonEmptyString(author)
	assert.nonEmptyString(repoName)

	return [author, repoName]
}
