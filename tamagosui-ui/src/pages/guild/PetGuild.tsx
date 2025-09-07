import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useQueryGuild } from "@/hooks/useQueryGuild"
import { FC } from "react"
import PetBadge from "./PetBadge"
import Skeleton from "@/components/skeleton"
import { ActionButton } from "../home/components/ActionButton"
import { ArrowRightFromLine } from "lucide-react"

type PetGuildProps = {
  id: string
}

const PetGuild: FC<PetGuildProps> = ({ id }) => {
  const { data, isPending } = useQueryGuild(id)

  if (!data || isPending)
    return (
      <Card>
        <CardHeader className="font-medium">
          <Skeleton className="w-20 h-4" />
        </CardHeader>
        <CardContent>
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className={`w-8 h-8 rounded-full -ml-3 first:ml-0`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <span className="font-medium">{data.name}</span>
        <ActionButton
          className="w-max flex-row-reverse"
          onClick={() => console.log("asd")}
          label="Join"
          icon={<ArrowRightFromLine />}
        />
      </CardHeader>
      <CardContent>
        {data.pet_ids.length > 0 ? (
          <div className="flex">
            {data.pet_ids.slice(0, 3).map((pet_id) => (
              <PetBadge key={pet_id} id={pet_id} />
            ))}
            {data.pet_ids.length > 2 && (
              <div className="w-8 h-8 flex flex-col items-center justify-center rounded-full text-xs font-medium bg-gray-500 text-white -ml-3">
                <span className="text-medium">
                  {data.pet_ids.slice(3).length}+
                </span>
              </div>
            )}
          </div>
        ) : (
          <small className="text-sm italic">No have any pets</small>
        )}
      </CardContent>
    </Card>
  )
}

export default PetGuild
