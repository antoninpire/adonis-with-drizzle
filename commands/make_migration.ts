import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { exec } from 'node:child_process'

export default class MakeMigration extends BaseCommand {
  static commandName = 'make:migration'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    exec('npx drizzle-kit generate --config=./config/database.ts', (err, stdout, stderr) => {
      if (err || stderr) this.logger.error(err?.message || stderr)
      else this.logger.info(stdout)
    })
  }
}
