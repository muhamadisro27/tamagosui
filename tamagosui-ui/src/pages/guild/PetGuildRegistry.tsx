import { GuildRegistry } from "@/types/Guild"
import PetGuild from "./PetGuild"
import { ActionButton } from "../home/components/ActionButton"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { useAdminCap } from "@/hooks/useAdminCap"
import { useQueryGuildRegistry } from "@/hooks/useQueryGuildRegistry"
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { Card } from "@/components/ui/card"
import { useMutateCreateGuild } from "@/hooks/useMutateCreateGuild"

const PetGuildRegistry = () => {
  const { isAdmin } = useAdminCap()
  const { data, isPending: isPendingGuildRegistry } = useQueryGuildRegistry()

  const { mutate: mutateCreateGuild, isPending: isPendingCreateGuild } =
    useMutateCreateGuild()

  if (isPendingGuildRegistry || !data) return <>Loading</>

  return (
    <div className="w-full container grid grid-cols-4 gap-5">
      {renderGuildList(data.guild_ids)}
      {isAdmin && data.guild_ids.length > 0 && (
        <Card
          onClick={() => {
            if (!isPendingCreateGuild) mutateCreateGuild()
          }}
          className="bg-gray-500/40 cursor-pointer min-h-[142px]"
        >
          <div className="self-start m-auto">
            {isPendingCreateGuild ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <ActionButton
                    className="w-max rounded-full items-center justify-center m-auto hover:bg-transparent"
                    size={"sm"}
                    variant={"ghost"}
                    icon={<PlusIcon />}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new guild</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

const renderGuildList = (guilds: GuildRegistry["guild_ids"]) => {
  if (guilds.length === 0) return <Empty />

  return guilds.map((id) => <PetGuild key={id} id={id} />)
}

const Empty = () => {
  const { isAdmin } = useAdminCap()

  const { mutate: mutateCreateGuild, isPending: isPendingCreateGuild } =
    useMutateCreateGuild()

  return (
    <div className="w-full flex justify-center items-center m-auto">
      <div className="flex flex-col items-center space-y-4">
        <h5>Don't have any guilds !</h5>
        {isAdmin && (
          <ActionButton
            className="w-max rounded-full items-center justify-center m-auto"
            size={"sm"}
            label="Add New Guild"
            onClick={() => {
              if (!isPendingCreateGuild) mutateCreateGuild()
            }}
            icon={<PlusIcon />}
          />
        )}
      </div>
    </div>
  )
}

PetGuildRegistry.Empty = Empty

export default PetGuildRegistry
