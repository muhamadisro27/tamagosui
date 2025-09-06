export type PetStructGameData = {
  coins: number
  experience: number
  level: number
}

export type PetStructStats = {
  energy: number
  happiness: number
  hunger: number
}

export type BasePetStruct = {
  id: string
  name: string
  adopted_at: number
  image_url: string
  stats: PetStructStats
  game_data: PetStructGameData
}

export type PetStruct = BasePetStruct & {
  isSleeping: boolean
}

export type PetAccessoryStruct = {
  id: { id: string }
  name: string
  image_url: string
}

export type SuiWrappedDynamicField<T> = {
  id: { id: string }
  name: any
  value: {
    fields: T
  }
}

export type RawPetStructFields = {
  id: { id: string }
  name: string
  image_url: string
  adopted_at: string
  stats: { fields: { energy: number; happiness: number; hunger: number } }
  game_data: { fields: { coins: number; experience: number; level: number } }
}
