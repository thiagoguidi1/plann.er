import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { GlobalButton } from "../../../global-components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  eventStartAndEndDates: DateRange | undefined
  switchGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen, switchGuestsInput,
  setDestination, setEventStartAndEndDates,
  eventStartAndEndDates
}: DestinationAndDateStepProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  function switchDatePicker() {
    setIsDatePickerOpen(!isDatePickerOpen);
  }

  const displayedDate = eventStartAndEndDates  && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "dd' de 'LLL").concat(" até ")
  .concat(format(eventStartAndEndDates.to, "dd' de 'LLL")) : null

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
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      {/* Calendar Input */}
      <button 
        onClick={switchDatePicker}
        disabled={isGuestsInputOpen == true} 
        className="w-[240px] flex items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="flex items-center justify-center fixed inset-0 bg-black/60">
          <div className="space-y-5 rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="textlg font-semibold">Selecione a Data</h2>
                <button onClick={switchDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
          </div>
        </div>
      )}



      <div className="w-px h-6 bg-zinc-700"></div>

      {/* isGuestsInputOpen é verdadeiro? */}
      {isGuestsInputOpen ? (
        // Se sim, faz isso
        <GlobalButton onClick={switchGuestsInput} variant="secondary">
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
