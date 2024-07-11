import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { GlobalButton } from "../../../global-components/button";

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
              onSubmit={createTrip}
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
                <Mail className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail..."
                  className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
                />
              </div>
              
              <GlobalButton type="submit" size="full">
                Confirmar criação da viagem
              </GlobalButton>
              
            </form>
          </div>
        </div>
   )
}