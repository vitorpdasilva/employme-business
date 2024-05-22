import { components } from './api-types'

export type CurrencyName = components['schemas']['CurrencyType']

export type CurrencyList = {
  name: CurrencyName
  value: CurrencyName
  symbol: string
}
