import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit"
import { useQuery } from "@tanstack/react-query"

import { MODULE_NAME, PACKAGE_ID } from "@/constants/contract"
import { normalizeSuiPetObject } from "@/lib/utils"
import { BasePetStruct } from "@/types/Pet"

export const queryKeyOwnedPet = (address?: string) => {
  if (address) return ["owned-pet", address]
  return ["owned-pet"]
}

export function useQueryOwnedPet() {
  const currentAccount = useCurrentAccount()
  const suiClient = useSuiClient()

  return useQuery({
    queryKey: queryKeyOwnedPet(currentAccount?.address),
    queryFn: async () => {
      if (!currentAccount) throw new Error("No connected account")

      // First, get the main pet object
      const petResponse = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: { StructType: `${PACKAGE_ID}::${MODULE_NAME}::Pet` },
        options: { showContent: true },
      })

      if (petResponse.data.length === 0) return []

      const petObjects = petResponse.data
        .map((petObject) => normalizeSuiPetObject(petObject))
        .filter((pet): pet is BasePetStruct => pet !== null)
        .sort((a, b) => a.adopted_at - b.adopted_at)

      if (petObjects.length === 0) return []

      const pets = await Promise.all(
        petObjects.map(async (pet) => {
          const dynamicFields = await suiClient.getDynamicFields({
            parentId: pet.id,
          })

          const isSleeping = dynamicFields.data.some(
            (field) =>
              field.name.type === "0x1::string::String" &&
              field.name.value === "sleep_started_at"
          )

          return { ...pet, isSleeping }
        })
      )

      return pets
    },
    enabled: !!currentAccount,
  })
}
