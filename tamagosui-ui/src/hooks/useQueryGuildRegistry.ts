import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit"
import { useQuery } from "@tanstack/react-query"

import { GUILD_REGISTRY_ID } from "@/constants/contract"
import { normalizeGuildRegistry } from "@/lib/utils"
import { GuildRegistry } from "@/types/Guild"

export const queryKeyGuildRegistry = () => ["guild-registry"]

export function useQueryGuildRegistry() {
  const currentAccount = useCurrentAccount()
  const suiClient = useSuiClient()

  return useQuery<GuildRegistry>({
    queryKey: queryKeyGuildRegistry(),
    queryFn: async (): Promise<GuildRegistry> => {
      if (!currentAccount) throw new Error("No connected account")

      const response = await suiClient.getObject({
        id: GUILD_REGISTRY_ID,
        options: { showContent: true },
      })

      if (!response?.data) {
        return {
          id: { id: GUILD_REGISTRY_ID },
          guild_ids: [],
        } as GuildRegistry
      }

      return normalizeGuildRegistry(response.data) as GuildRegistry
    },
    enabled: !!currentAccount,
  })
}
