import { MapPin, Calendar, Settings2 } from "lucide-react";
import { GlobalButton } from "../../../global-components/button";
import { useParams }from 'react-router-dom'
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { format } from "date-fns";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  //Ira salvar um objeto igual a interface Trip ou undefined
  const [trip, setTrip] = useState<Trip | undefined>();

  //O primeiro parametro só ira executar dnv caso o segundo parametro (tripId) mude
  useEffect(() => {
    api.get(`/trips/${tripId}`).then(res => setTrip(res.data.trip))
  }, [tripId])

  const displayedDate = trip
  ? format(trip?.starts_at, "dd' de 'LLL").concat(" até ")
  .concat(format(trip?.ends_at, "dd' de 'LLL")) : null

  return (
    <div className="px-4 h-16 flex items-center justify-between rounded-xl bg-zinc-900 shadow-shape">
      <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <GlobalButton variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </GlobalButton>
      </div>
    </div>
  )
}