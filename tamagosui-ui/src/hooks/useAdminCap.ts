import { PACKAGE_ID } from "@/constants/contract"
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"

export function useAdminCap() {
  const [isAdmin, setIsAdmin] = useState(false)
  const account = useCurrentAccount()
  const packageId = PACKAGE_ID

  const { data } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      filter: {
        StructType: `${packageId}::guild::AdminCap`,
      },
      options: { showType: true },
    },
    {
      enabled: Boolean(account),
    }
  )

  useEffect(() => {
    setIsAdmin(Boolean(data?.data.length))
  }, [data])

  return { isAdmin }
}
