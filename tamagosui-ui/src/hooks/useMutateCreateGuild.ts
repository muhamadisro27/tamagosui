import {
  useCurrentAccount,
  useSuiClient,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  GUILD_MODULE_NAME,
  PACKAGE_ID,
  GUILD_REGISTRY_ID,
  ADMIN_CAP_ID,
} from "@/constants/contract"
import { queryKeyGuildRegistry } from "./useQueryGuildRegistry"

const mutateKeyCreateGuild = ["mutate", "create-guild"]

export function useMutateCreateGuild() {
  const currentAccount = useCurrentAccount()
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction()
  const suiClient = useSuiClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutateKeyCreateGuild,
    mutationFn: async () => {
      if (!currentAccount) throw new Error("No connected account")

      const tx = new Transaction()
      tx.moveCall({
        target: `${PACKAGE_ID}::${GUILD_MODULE_NAME}::create_guild`,
        arguments: [
          tx.object(GUILD_REGISTRY_ID),
          tx.pure.string(`Guild ${Math.floor(Math.random() * 100_000)}`),
          tx.object(ADMIN_CAP_ID),
        ],
      })

      const { digest } = await signAndExecute({ transaction: tx })
      const response = await suiClient.waitForTransaction({
        digest,
        options: { showEffects: true, showEvents: true },
      })
      if (response?.effects?.status.status === "failure")
        throw new Error(response.effects.status.error)

      return response
    },
    onSuccess: (response) => {
      toast.success(`Guild created successfully! Tx: ${response.digest}`)

      queryClient.invalidateQueries({ queryKey: queryKeyGuildRegistry() })
    },
    onError: (error) => {
      console.error("Error creating guild:", error)
      toast.error(`Error creating guild: ${error.message}`)
    },
  })
}
