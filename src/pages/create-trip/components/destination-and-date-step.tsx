import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

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
        <button
          onClick={switchGuestsInput}
          className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
        >
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      ) : (
        // Se não, faz isso
        <button
          onClick={switchGuestsInput}
          className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400"
        >
          Continuar
          <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  );
}
