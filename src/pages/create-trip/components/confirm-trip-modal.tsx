import { User, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
    switchTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal({
  switchTripModal, createTrip
}: ConfirmTripModalProps) {

 

   return (
      <div className="flex items-center justify-center fixed inset-0 bg-black/60">
          <div className="w-[640px] space-y-5 rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="textlg font-semibold">Confirmar criação de viagem</h2>
                <button onClick={switchTripModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span>, preencha seus dados abaixo:
              </p>
            </div>

            {/* Send Email Input */}
            <form
              onClick={createTrip}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 h-14 px-4 rounded-lg border bg-zinc-950 border-zinc-800">
                <User className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="text"
                  placeholder="Seu nome completo..."
                  className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
                />
              </div>
              <div className="flex items-center gap-2 h-14 px-4 rounded-lg border bg-zinc-950 border-zinc-800">
                <User className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu nome completo..."
                  className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
                />
              </div>

              <button
               
                type="submit"
                className="w-full gap-2 px-5 h-11 flex justify-center items-center  font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400"
              >
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
   )
}