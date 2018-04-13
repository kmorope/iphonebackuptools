const fs = require('fs')
const path = require('path')

const log = require('../../util/log')
const bplist = require('bplist-parser')

module.exports = {
  version: 3,
  name: 'backup.status',
  description: `Gets a backup's status`,
  requiresBackup: true,

  // Run on a v3 lib / backup object.
  run (lib, { backup }) {
    return new Promise((resolve, reject) => {
      try {
        // Load and parse status for the backup.
        log.verbose('parsing status', backup.path)
        let data = bplist.parseBuffer(fs.readFileSync(path.join(backup.path, 'Status.plist')))[0]

        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }
}
