import { ArrowRight, UserRoundPlus } from "lucide-react";
import { GlobalButton } from "../../../global-components/button";

interface InviteGuestsStepProps {
  switchGuestsModal: () => void
  emailsToInvite: string[]
  switchTripModal: () => void
}

export function InviteGuestsStep({
  switchGuestsModal, emailsToInvite, switchTripModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 flex items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
      <button
        type="button"
        onClick={switchGuestsModal}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {/* Se o tamanho da lista de convidados for maior q 0 */}
        {emailsToInvite.length > 0 ? (
          // Mostra isso
          <span className="flex-1 ttext-lg bg-transparent text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          //Se não, mostra isso
          <span className="flex-1 text-lg bg-transparent text-zinc-400">Quem estará na viagem?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-700" />

      <GlobalButton onClick={switchTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </GlobalButton>
    </div>
  )
}