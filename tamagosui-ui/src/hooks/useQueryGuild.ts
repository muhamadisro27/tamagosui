import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit"
import { useQuery } from "@tanstack/react-query"
import { Guild } from "@/types/Guild"
import { normalizeGuild } from "@/lib/utils"

export const queryKeyGuilds = (id: string) => ["guild", id]

export function useQueryGuild(id: string) {
  const currentAccount = useCurrentAccount()
  const suiClient = useSuiClient()

  return useQuery<Guild>({
    queryKey: queryKeyGuilds(id),
    queryFn: async (): Promise<Guild> => {
      if (!currentAccount) throw new Error("No connected account")

      const response = await suiClient.getObject({
        id,
        options: { showContent: true },
      })

      if (!response?.data) {
        return {
          id: { id },
          name: "",
          pet_ids: [],
        } as Guild
      }

      return normalizeGuild(response.data) as Guild
    },
    enabled: !!currentAccount,
  })
}
