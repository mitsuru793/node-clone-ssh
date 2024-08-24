import is from '@sindresorhus/is'
import { CloneSshUrl } from './model/cloneSshUrl'

type Option = {
	domain?: string
}

export function run(urlRaw: string, ops: Option = {}): CloneSshUrl {
	if (!is.nonEmptyString(urlRaw)) {
		throw new Error('Given url must be fill string')
	}

	const cloneSshUrl = CloneSshUrl.fromId(urlRaw)
	if (!ops.domain) {
		return cloneSshUrl
	}

	return CloneSshUrl.changeDomain(cloneSshUrl, ops.domain)
}
