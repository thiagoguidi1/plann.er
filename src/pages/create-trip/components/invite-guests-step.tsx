import { ArrowRight, UserRoundPlus } from "lucide-react";

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

      <button  onClick={switchTripModal} className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400">
        Confirmar viagem
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}