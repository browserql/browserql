import { applyParameters } from 'paramizer'

export enum PATH {
  modulePath = '/module/:module',
}

export const makePath = {
  module(mod: string) {
    return applyParameters(PATH.modulePath, { module: mod })
  },
}

export enum API_PATH {
  getModuleExampleFiles = '/api/files/:module/:example',
  getModuleReadme = '/api/README/:module',
}

// export const _makeApiPath

export const makeApiPath = {
  _(pathname: string) {
    return `http://localhost:4500${pathname}`
  },

  getModuleExampleFiles(mod: string, example: string) {
    return makeApiPath._(
      applyParameters(API_PATH.getModuleExampleFiles, {
        module: mod,
        example,
      })
    )
  },

  getModuleReadme(params: { module: string }) {
    return makeApiPath._(applyParameters(API_PATH.getModuleReadme, params))
  },
}
