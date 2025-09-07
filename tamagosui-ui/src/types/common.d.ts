export type SuiWrappedDynamicField<T> = {
  id: SuiID
  name: any
  value: {
    fields: T
  }
}

export type SuiID = {
  id: string
} 