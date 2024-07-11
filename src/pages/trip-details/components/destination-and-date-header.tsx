import { MapPin, Calendar, Settings2 } from "lucide-react";
import { GlobalButton } from "../../../global-components/button";

export function DestinationAndDateHeader() {
  return (
    <div className="px-4 h-16 flex items-center justify-between rounded-xl bg-zinc-900 shadow-shape">
      <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">São Paulo, SP</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">17 a 23 de Agosto</span>
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