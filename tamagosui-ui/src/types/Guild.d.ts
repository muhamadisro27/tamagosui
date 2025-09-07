import { SuiID } from "./common"

export interface Guild {
  id: SuiID
  name: string
  pet_ids : string[]
}

export interface GuildRegistry {
  id: SuiID
  guild_ids: string[]
}
