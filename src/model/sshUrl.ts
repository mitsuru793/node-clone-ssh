import { assert } from '@sindresorhus/is'

export type SshUrl = string & { readonly brannd: unique symbol }

type ParsedSshUrl = Readonly<{
	author: string
	repoName: string
}>

const regexp = new RegExp('^git@github.com:([^/]+)/([^/]+).git$')

export const SshUrl = {
	is(value: string): value is SshUrl {
		return regexp.test(value)
	},

	parse(url: SshUrl): ParsedSshUrl {
		const matched = url.match(regexp)
		if (!matched) {
			throw new Error(`Failed to parse sshUrl: ${url}`)
		}

		const [_, author, repoName] = matched
		assert.nonEmptyString(author)
		assert.nonEmptyString(repoName)
		return { author, repoName }
	},
}
