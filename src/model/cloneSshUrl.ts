import is, { assert } from '@sindresorhus/is'
import { trim } from '../util'
import { RepoIdName } from './repoIdName'
import { SshUrl } from './sshUrl'

type CloneSshUrl = string & { readonly brancd: unique symbol }

type ParsedCloneSshUrl = Readonly<{
	author: string
	repoName: string
}>

const regexp = new RegExp('^git@github.com:([^/]+)/([^/]+).git$')

export const CloneSshUrl = {
	// TODO: make arg domain not be optional
	create(author: string, repoName: string, domain = 'github.com'): CloneSshUrl {
		return `git@${domain}:${author}/${repoName}.git` as CloneSshUrl
	},

	fromId(id: string): CloneSshUrl {
		if (is.urlString(id)) {
			return CloneSshUrl.fromHttp(id)
		}

		if (SshUrl.is(id)) {
			return CloneSshUrl.fromSshUrl(id)
		}

		if (RepoIdName.parse(id)) {
			return CloneSshUrl.fromRepoIdName(id)
		}

		throw new Error(`Unsupport format of id: ${id}`)
	},

	fromHttp(urlRaw: string): CloneSshUrl {
		const url = new URL(urlRaw)
		if (!isGithubRepoHttpUrl(url)) {
			throw new Error(`Support url is github only yet: ${url}`)
		}

		const [author, repoName] = trim(url.pathname, '/').split('/')
		return CloneSshUrl.create(author, repoName)
	},

	fromSshUrl(sshUrl: SshUrl): CloneSshUrl {
		const { author, repoName } = SshUrl.parse(sshUrl)
		return CloneSshUrl.create(author, repoName)
	},

	fromRepoIdName(name: RepoIdName): CloneSshUrl {
		const [author, repoName] = RepoIdName.parse(name)
		return CloneSshUrl.create(author, repoName)
	},

	changeDomain(url: CloneSshUrl, domain: string): CloneSshUrl {
		const { author, repoName } = CloneSshUrl.parse(url)
		return CloneSshUrl.create(author, repoName, domain)
	},

	parse(url: CloneSshUrl): ParsedCloneSshUrl {
		const matched = url.match(regexp)
		if (!matched) {
			throw new Error(`Failed to parse CloneSshUrl: ${url}`)
		}

		const [_, author, repoName] = matched
		assert.nonEmptyString(author)
		assert.nonEmptyString(repoName)

		return { author, repoName }
	},
}

export function isGithubRepoHttpUrl(url: URL): boolean {
	const matched = url.origin.match('https://github.com')
	if (!matched) {
		return false
	}
	return RepoIdName.is(url.pathname.replace(/^\//, ''))
}
