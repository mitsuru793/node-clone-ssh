import minimist from 'minimist'
import { run } from '../src/command'
import { compactObject } from '../src/util'

type Option = {
	domain?: string
	domainPrefix: string
}

async function main(argvRaw): Promise<void> {
	const argv = minimist<Option>(argvRaw, {
		string: ['domain', 'domainPrefix'],
	})
	const [repoId] = argv._

	const ops = compactObject({
		domain: argv.domain,
		prefixDomain: argv['domain-prefix'],
	})

	try {
		console.log(run(repoId, ops))
	} catch (err) {
		console.log(err.message)
	}
}

main(process.argv.slice(2))
