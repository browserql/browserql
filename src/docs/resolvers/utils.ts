import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises'
import {template, templateSettings } from 'lodash'
import { join } from 'path'
import colors from 'colors'
import { merge } from 'lodash'

export async function copyAndTransformFile(src: string, destination: string, transformer: (source: string) => Promise<string>) {
  const source = (await readFile(src)).toString()
  const nextSource = await transformer(source)
  await writeFile(destination, nextSource)
  return nextSource
}

export function parseTemplate(tpl: string, options: Record<string, any>) {
  const oldValue = templateSettings.interpolate
  templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const compiled = template(tpl)
  return compiled(options)
}

export async function copyOver(source: string, destination: string, options: Record<string, any> = {}) {
  const files = await readdir(source)
  await Promise.all(
    files.map(async file => {
      const stats = await stat(join(source, file))
      if (stats.isFile()) {
        await copyAndTransformFile(
          join(source, file),
          join(destination, file),
          async source => parseTemplate(source, options)
        )
      } else if (stats.isDirectory()) {
        await mkdir(join(destination, file))
        await copyOver(join(source, file), join(destination, file), options)
      }
    })
  )
}
interface StepOptions {
  ignoreError?: boolean
}

type Step<T extends Record<string, any>> = [name: string, step: (ctx: Partial<T>) => Promise<any>, options?: StepOptions]

export function stepper<T extends Record<string, any>>(ctx: Partial<T> = {}) {
  return async (...steps: Step<T>[]) => {
    let [first] = steps
    if (first) {
      const [name, step, options = {}] = first
  
      try {
        console.log(colors.blue(name))
        const next = await step(ctx)
        merge(ctx, { [name]: next })
        console.log(colors.green(name))
      } catch (error) {
        if (!options.ignoreError) {
          console.log(colors.red(name))
          throw error
        }
      } finally {
        await stepper<T>(ctx)(...steps.slice(1))
      }
    }
  }
}
