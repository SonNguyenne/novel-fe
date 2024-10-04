export const formatCurrency = (amount?: number | string | null): string | undefined => {
  try {
    let value = NaN
    if (typeof amount === 'number') {
      value = amount
    } else if (typeof amount === 'string') {
      value = parseFloat(amount)
    }

    if (Number.isNaN(value)) {
      return undefined
    }

    let safeOptions = {}
    safeOptions = {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'narrowSymbol',
    }

    return value.toLocaleString('vi', safeOptions)
  } catch {
    return undefined
  }
}
