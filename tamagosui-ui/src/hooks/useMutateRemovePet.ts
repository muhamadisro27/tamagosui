import {
  useCurrentAccount,
  useSuiClient,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeyOwnedPet } from "./useQueryOwnedPet";
import { MODULE_NAME, PACKAGE_ID } from "@/constants/contract";

const mutationKeyRemovePet = ["mutate", "remove-adopted-pet"];

type UseMutateRemovePetParams = {
  id: string;
};

export function useMutateRemovePet() {
  const currentAccount = useCurrentAccount();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeyRemovePet,
    mutationFn: async ({ id }: UseMutateRemovePetParams) => {
      if (!currentAccount) throw new Error("No connected account");

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::remove_pet_adopted`,
        arguments: [tx.object(id)],
      });

      const result = await signAndExecute({ transaction: tx });
      const response = await suiClient.waitForTransaction({
        digest: result.digest,
        options: { showEvents: true, showEffects: true },
      });

      if (response?.effects?.status.status === "failure")
        throw new Error(response.effects.status.error);

      return response;
    },
    onSuccess: (response) => {
      toast.success(`Pet removed successfully! Tx: ${response.digest}`);
      queryClient.invalidateQueries({ queryKey: queryKeyOwnedPet() });
    },
    onError: (error) => {
      console.error("Error removing pet:", error);
      toast.error(`Error removing pet: ${error.message}`);
    },
  });
}
