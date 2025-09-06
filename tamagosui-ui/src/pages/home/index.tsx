import { useQueryOwnedPet } from "@/hooks/useQueryOwnedPet"
import { useCurrentAccount } from "@mysten/dapp-kit"
import AdoptComponent from "./AdoptComponent"
import Header from "@/components/Header"
import PetList from "./PetList"

export default function HomePage() {
  const currentAccount = useCurrentAccount()
  const { data: ownedPets, isPending: isOwnedPetLoading } = useQueryOwnedPet()

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 pt-24">
        {!currentAccount ? (
          <div className="text-center p-8 border-4 border-primary bg-background shadow-[8px_8px_0px_#000]">
            <h2 className="text-4xl uppercase">Please Connect Wallet</h2>
          </div>
        ) : isOwnedPetLoading ? (
          <div className="text-center p-8 border-4 border-primary bg-background shadow-[8px_8px_0px_#000]">
            <h2 className="text-4xl uppercase">Loading Pet...</h2>
          </div>
        ) : ownedPets?.length ? (
          <PetList pets={ownedPets} />
        ) : (
          <AdoptComponent />
        )}
      </main>
    </div>
  )
}
