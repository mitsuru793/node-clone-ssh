import is, { assert } from '@sindresorhus/is'
import { trim } from '../util'
import { type SshUrl, isSshUrl, parseSshUrl } from './sshUrl'
import { RepoIdName } from './repoIdName'

type CloneSshUrl = string

const regexp = new RegExp('^git@github.com:([^/]+)/([^/]+).git$')

// TODO: make arg domain not be optional
export function createCloneSshUrl(
	author: string,
	repoName: string,
	domain = 'github.com',
): CloneSshUrl {
	return `git@${domain}:${author}/${repoName}.git`
}

export function createCloneSshUrlFromHttp(urlRaw: string): CloneSshUrl {
	const url = new URL(urlRaw)
	if (!isGithubRepoHttpUrl(url)) {
		throw new Error(`Support url is github only yet: ${url}`)
	}

	const [author, repoName] = trim(url.pathname, '/').split('/')
	return createCloneSshUrl(author, repoName)
}

export function isGithubRepoHttpUrl(url: URL): boolean {
	const matched = url.origin.match('https://github.com')
	if (!matched) {
		return false
	}
	return RepoIdName.is(url.pathname.replace(/^\//, ''))
}

export function createCloneSshUrlFromSshUrl(sshUrl: SshUrl): CloneSshUrl {
	const { author, repoName } = parseSshUrl(sshUrl)
	return createCloneSshUrl(author, repoName)
}

export function createCloneSshUrlFromRepoIdName(name: RepoIdName): CloneSshUrl {
	const [author, repoName] = RepoIdName.parse(name)
	return createCloneSshUrl(author, repoName)
}

export function createCloneSshUrlFromId(id: string): CloneSshUrl {
	if (is.urlString(id)) {
		return createCloneSshUrlFromHttp(id)
	}

	if (isSshUrl(id)) {
		return createCloneSshUrlFromSshUrl(id)
	}

	if (RepoIdName.parse(id)) {
		return createCloneSshUrlFromRepoIdName(id)
	}

	throw new Error(`Unsupport format of id: ${id}`)
}

export function changeCloneSshUrlDomain(
	url: CloneSshUrl,
	domain: string,
): CloneSshUrl {
	const { author, repoName } = parseCloneSshUrl(url)
	return createCloneSshUrl(author, repoName, domain)
}

type ParsedCloneSshUrl = {
	author: string
	repoName: string
}

function parseCloneSshUrl(url: CloneSshUrl): ParsedCloneSshUrl {
	const regexp = new RegExp('^git@github.com:([^/]+)/([^/]+).git$')

	const matched = url.match(regexp)
	if (!matched) {
		throw new Error(`Failed to parse CloneSshUrl: ${url}`)
	}

	const [_, author, repoName] = matched
	assert.nonEmptyString(author)
	assert.nonEmptyString(repoName)

	return { author, repoName }
}
