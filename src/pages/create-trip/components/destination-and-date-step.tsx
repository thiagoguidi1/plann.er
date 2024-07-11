import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { GlobalButton } from "../../../global-components/button";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  switchGuestsInput: () => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen, switchGuestsInput
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 flex items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
      {/* Map Input */}
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen == true}
          type="text"
          placeholder="Para onde você vai?"
          className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
        />
      </div>

      {/* Calendar Input */}
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen == true}
          type="text"
          placeholder="Quando?"
          className="w-40 bg-transparent text-lg outline-none placeholder-zinc-400"
        />
      </div>

      <div className="w-px h-6 bg-zinc-700"></div>

      {/* isGuestsInputOpen é verdadeiro? */}
      {isGuestsInputOpen ? (
        // Se sim, faz isso
        <GlobalButton onClick={switchGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </GlobalButton>
      ) : (
        // Se não, faz isso
        <GlobalButton onClick={switchGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </GlobalButton>
      )}
    </div>
  );
}
