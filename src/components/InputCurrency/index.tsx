import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void //eslint-disable-line
  name: string
  prefix?: string
}

export const InputCurrency = forwardRef<NumericFormatProps, CustomProps>(function NumericInput(props, ref) {
  const { onChange, prefix, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values): void => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix ?? '$'}
      max={1_000_000}
    />
  )
})
