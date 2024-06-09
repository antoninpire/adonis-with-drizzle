import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

export default class GenerateModels extends BaseCommand {
  static commandName = 'generate:models'
  static description =
    'Reads the schema and generates model classes in app/models (to make autoswagger work)'

  static options: CommandOptions = {}

  async run() {
    const schemaPath = path.resolve(
      path.dirname(url.fileURLToPath(import.meta.url)),
      '../database/schema.ts'
    )
    const outputPath = path.resolve(
      path.dirname(url.fileURLToPath(import.meta.url)),
      '../app/models/'
    )

    const schemaContent = (await import(schemaPath)) as Record<
      string,
      Record<
        string,
        {
          config: {
            name: string
            dataType: string
            notNull: boolean
          }
        }
      >
    >

    const schemaTables = Object.keys(schemaContent)
    for (const table of schemaTables) {
      let fileContent = `export default class ${table.slice(0, -1)} {\n`
      const tableContent = schemaContent[table]
      const tableColumns = Object.keys(tableContent)
      for (const column of tableColumns) {
        let type = ''

        if (tableContent[column].config.dataType === 'date') {
          type = 'Date'
        } else {
          type = tableContent[column].config.dataType
        }

        if (tableContent[column].config.notNull === false) {
          type += ' | null'
        }
        fileContent += `\tdeclare ${column}: ${type}\n`
      }
      fileContent += '}'

      fs.writeFileSync(outputPath + '/' + table.slice(0, -1).toLowerCase() + '.ts', fileContent)
    }

    this.logger.info('Generated models')
  }
}
