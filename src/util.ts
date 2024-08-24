export function trim(target: string, remove: string): string {
	const regexp = new RegExp(`^${remove}?(.*)${remove}?$`)
	const matched = target.match(regexp)
	if (!matched) {
		const params = JSON.stringify({ target, remove })
		throw new Error(`Failed to match to trim: ${params}`)
	}

	return matched[1]
}
