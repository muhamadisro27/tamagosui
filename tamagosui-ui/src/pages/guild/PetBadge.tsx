import { FC } from "react"

type PetBadgeProps = {
  id: string
}

const PetBadge: FC<PetBadgeProps> = ({ id }) => {
  // const

  return (
    <div className="w-8 h-8 rounded-full -ml-3 first:ml-0">
      <div className="flex justify-center">
        <img
          src="https://tan-kind-lizard-741.mypinata.cloud/ipfs/bafkreidkhjpthergw2tcg6u5r344shgi2cdg5afmhgpf5bv34vqfrr7hni"
          alt={id}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  )
}

export default PetBadge
