import cp = require('child_process')
import findVersions from 'find-versions'
import compareVersions from 'compare-versions'
import { debug } from '../debug'

export function checkGitVersion(): void {
  const { status, stderr, stdout } = cp.spawnSync('git', ['--version'])

  if (status !== 0) {
    throw new Error(stderr.toString())
  }

  const [version] = findVersions(stdout.toString())

  debug(`Git version is ${version}`)

  if (compareVersions(version, '2.13.0') === -1) {
    throw new Error(`Husky requires Git >=2.13.0. Got v${version}.`)
  }
}
