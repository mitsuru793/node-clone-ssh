import is from '@sindresorhus/is'
import {
	changeCloneSshUrlDomain,
	createCloneSshUrlFromId,
} from './model/cloneSshUrl'

type Option = {
	domain?: string
}

export function run(urlRaw: string, ops: Option = {}) {
	if (is.emptyString(urlRaw)) {
		throw new Error('Given url must be fill string')
	}

	const cloneSshUrl = createCloneSshUrlFromId(urlRaw)
	// TODO: remove next line
	ops.domain = ops.domain || 'github.com'
	return changeCloneSshUrlDomain(cloneSshUrl, ops.domain)
}
