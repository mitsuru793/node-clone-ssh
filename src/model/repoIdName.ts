import { assert } from '@sindresorhus/is'

export type RepoIdName = string & { readonly brand: unique symbol }

const regexp = new RegExp('^([^/]+)/([^/]+)$')

export const RepoIdName = {
	of(value: string): RepoIdName {
		if (!RepoIdName.is(value)) {
			throw new Error(`RepoIdName must be format(author/repo): ${value}`)
		}
		return value
	},

	is(value: string): value is RepoIdName {
		return regexp.test(value)
	},

	parse(idName: RepoIdName): [string, string] {
		const matched = idName.match(regexp)
		if (!matched) {
			throw new Error(`Failed to parse RepoIdName: ${idName}`)
		}

		const [_, author, repoName] = matched
		assert.nonEmptyString(author)
		assert.nonEmptyString(repoName)

		return [author, repoName]
	},
}
