import { PetStruct } from "@/types/Pet"
import { FC, useEffect, useState } from "react"
import PetComponent from "./PetComponent"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { CirclePlus, CircleX } from "lucide-react"
import AdoptComponent from "./AdoptComponent"
import type { Swiper as SwiperType } from "swiper"

type PetDashboardProps = {
  pets: PetStruct[]
}

const PetList: FC<PetDashboardProps> = ({ pets }) => {
  const [showAddNewAdopt, setShowAddNewAdopt] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  useEffect(() => {
    if (!swiper) return

    if (showAddNewAdopt) {
      swiper.slideTo(0)
      swiper.allowSlideNext = false
      swiper.allowSlidePrev = false
    } else {
      swiper.allowSlideNext = true
      swiper.allowSlidePrev = true
    }
  }, [showAddNewAdopt, swiper])

  useEffect(() => {
    if (swiper && isSuccess) {
      setTimeout(() => {
        swiper.slideTo(pets.length)
        setIsSuccess(false)
      }, 500)
    }
  }, [isSuccess, swiper])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!swiper) return
      if (e.key === "ArrowLeft") {
        swiper.slidePrev()
      }
      if (e.key === "ArrowRight") {
        swiper.slideNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [swiper])

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-lg relative">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="mySwiper"
          onSwiper={setSwiper}
        >
          {showAddNewAdopt && (
            <SwiperSlide key={"adopt"}>
              <AdoptComponent
                setLoading={setLoading}
                setIsSuccess={setIsSuccess}
                setShowAddNewAdopt={setShowAddNewAdopt}
                showAddNewAdopt={showAddNewAdopt}
              />
            </SwiperSlide>
          )}
          {pets.map((pet) => (
            <SwiperSlide key={pet.id}>
              <PetComponent pet={pet} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute -right-40 top-1/2">
          <Button
            disabled={loading}
            onClick={() => setShowAddNewAdopt(!showAddNewAdopt)}
            variant={showAddNewAdopt ? "destructive" : "default"}
            className="cursor-pointer"
          >
            {showAddNewAdopt ? "Cancel" : "Add New"}
            {showAddNewAdopt ? <CircleX /> : <CirclePlus />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PetList
