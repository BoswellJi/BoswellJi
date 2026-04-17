type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonObject | JsonArray

interface JsonObject {
  [key: string]: JsonValue
}

interface JsonArray extends Array<JsonValue> {}

export class Json2Ts {
  convert(content: string): string {
    const jsonContent = JSON.parse(content) as JsonValue

    if (Array.isArray(jsonContent)) {
      const firstItem = jsonContent[0]
      if (isJsonObject(firstItem)) {
        return this.convertObjectToTsInterfaces(firstItem)
      }

      return 'export type RootObject = any[];'
    }

    if (isJsonObject(jsonContent)) {
      return this.convertObjectToTsInterfaces(jsonContent)
    }

    return 'export type RootObject = any;'
  }

  private convertObjectToTsInterfaces(
    jsonContent: JsonObject,
    objectName = 'RootObject'
  ): string {
    const optionalKeys: string[] = []
    const objectResult: string[] = []
    const typeMap: Record<string, string> = {}

    for (const [key, value] of Object.entries(jsonContent)) {
      if (isJsonObject(value)) {
        const childObjectName = this.toUpperFirstLetter(key)
        objectResult.push(
          this.convertObjectToTsInterfaces(value, childObjectName)
        )
        typeMap[key] = `${this.removePlurality(childObjectName)};`
        continue
      }

      if (Array.isArray(value)) {
        typeMap[key] = this.resolveArrayType(key, value, objectResult)
        continue
      }

      if (typeof value === 'string') {
        typeMap[key] = 'string;'
      } else if (typeof value === 'boolean') {
        typeMap[key] = 'boolean;'
      } else if (typeof value === 'number') {
        typeMap[key] = 'number;'
      } else {
        typeMap[key] = 'any;'
        optionalKeys.push(key)
      }
    }

    objectResult.push(
      this.formatCharsToTypeScript(typeMap, objectName, optionalKeys)
    )

    return objectResult.join('\n\n')
  }

  private resolveArrayType(
    key: string,
    value: JsonValue[],
    objectResult: string[]
  ): string {
    const arrayTypes = this.detectMultiArrayTypes(value)

    if (this.isMultiArray(arrayTypes)) {
      const multiArrayBrackets = this.getMultiArrayBrackets(value)
      return this.isAllEqual(arrayTypes)
        ? arrayTypes[0]!.replace('[]', multiArrayBrackets)
        : `any${multiArrayBrackets};`
    }

    const firstItem = value[0]
    if (isJsonObject(firstItem)) {
      const childObjectName = this.toUpperFirstLetter(key)
      objectResult.push(
        this.convertObjectToTsInterfaces(firstItem, childObjectName)
      )
      return `${this.removePlurality(childObjectName)}[];`
    }

    return arrayTypes[0] ?? 'any[];'
  }

  private detectMultiArrayTypes(
    value: JsonValue[],
    valueType: string[] = []
  ): string[] {
    if (value.length === 0) {
      valueType.push('any[];')
      return valueType
    }

    if (Array.isArray(value[0])) {
      for (const element of value) {
        if (Array.isArray(element)) {
          this.detectMultiArrayTypes(element, valueType)
        }
      }
      return valueType
    }

    if (value.every(item => typeof item === 'string')) {
      valueType.push('string[];')
    } else if (value.every(item => typeof item === 'number')) {
      valueType.push('number[];')
    } else if (value.every(item => typeof item === 'boolean')) {
      valueType.push('boolean[];')
    } else {
      valueType.push('any[];')
    }

    return valueType
  }

  private isMultiArray(arrayTypes: string[]): boolean {
    return arrayTypes.length > 1
  }

  private isAllEqual(array: string[]): boolean {
    return array.slice(1).every(item => item === array[0])
  }

  private getMultiArrayBrackets(content: JsonValue[]): string {
    const jsonString = JSON.stringify(content)
    let brackets = ''

    for (const element of jsonString) {
      if (element === '[') {
        brackets += '[]'
      } else {
        break
      }
    }

    return brackets
  }

  private formatCharsToTypeScript(
    jsonContent: Record<string, string>,
    objectName: string,
    optionalKeys: string[]
  ): string {
    let result = JSON.stringify(jsonContent, null, '\t')
      .replace(/"/g, '')
      .replace(/,/g, '')

    for (const key of Object.keys(jsonContent)) {
      const formattedKey = optionalKeys.includes(key)
        ? `${this.toLowerFirstLetter(key)}?:`
        : `${this.toLowerFirstLetter(key)}:`
      result = result.replace(
        new RegExp(`${escapeRegExp(key)}:`, 'g'),
        formattedKey
      )
    }

    return `export interface ${this.removePlurality(objectName)} ${result}`
  }

  private removePlurality(objectName: string): string {
    if (objectName.slice(-3).toUpperCase() === 'IES') {
      return `${objectName.slice(0, -3)}y`
    }

    if (objectName.slice(-1).toUpperCase() === 'S') {
      return objectName.slice(0, -1)
    }

    return objectName
  }

  private toUpperFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  private toLowerFirstLetter(text: string): string {
    return text.charAt(0).toLowerCase() + text.slice(1)
  }
}

export function isJson(stringContent: string): boolean {
  try {
    JSON.parse(stringContent)
  } catch {
    return false
  }

  return true
}

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
