import Header from "@/components/Header"
import PetGuildRegistry from "./PetGuildRegistry"

export default function GuildPage() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-grow flex items-start justify-center p-4 pt-24">
        <PetGuildRegistry />
      </main>
    </div>
  )
}
