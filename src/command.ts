import is from '@sindresorhus/is'
import { CloneSshUrl } from './model/cloneSshUrl'

type Option = {
	domain?: string
}

export function run(urlRaw: string, ops: Option = {}) {
	if (!is.nonEmptyString(urlRaw)) {
		throw new Error('Given url must be fill string')
	}

	const cloneSshUrl = CloneSshUrl.fromId(urlRaw)
	// TODO: remove next line
	ops.domain = ops.domain || 'github.com'
	return CloneSshUrl.changeDomain(cloneSshUrl, ops.domain)
}
