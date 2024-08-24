import { assert } from '@sindresorhus/is'

export type SshUrl = string

const regexp = new RegExp('^git@github.com:([^/]+)/([^/]+).git$')

export function isSshUrl(url: string): url is SshUrl {
	try {
		return !!parseSshUrl(url)
	} catch (_) {
		return false
	}
}

type ParsedSshUrl = {
	author: string
	repoName: string
}

export function parseSshUrl(url: SshUrl): ParsedSshUrl {
	const matched = url.match(regexp)
	if (!matched) {
		throw new Error(`Failed to parse sshUrl: ${url}`)
	}

	const [_, author, repoName] = matched
	assert.nonEmptyString(author)
	assert.nonEmptyString(repoName)
	return { author, repoName }
}
