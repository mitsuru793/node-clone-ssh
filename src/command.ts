import is from '@sindresorhus/is'
import { CloneSshUrl } from './model/cloneSshUrl'

type Option = {
	domain?: string
	prefixDomain?: string
}

export function run(urlRaw: string, ops: Option = {}): CloneSshUrl {
	if (!is.nonEmptyString(urlRaw)) {
		throw new Error('Given url must be fill string')
	}
	const bothDomainOptionEnable = [ops.domain, ops.prefixDomain].every(
		is.nonEmptyString,
	)
	if (bothDomainOptionEnable) {
		throw new Error('Use either opiton domain or prefixDomain, but not both.')
	}

	const cloneSshUrl = CloneSshUrl.fromId(urlRaw)
	const bothDomainOptionDisable = [ops.domain, ops.prefixDomain].every(is.falsy)
	if (bothDomainOptionDisable) {
		return cloneSshUrl
	}

	if (is.nonEmptyString(ops.domain)) {
		return CloneSshUrl.changeDomain(cloneSshUrl, ops.domain)
	}

	if (is.nonEmptyString(ops.prefixDomain)) {
		return CloneSshUrl.prefixDomain(cloneSshUrl, ops.prefixDomain)
	}

	throw new Error('Call run function when invalid pattern.')
}
