import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { GlobalButton } from "../../../global-components/button";

// Interface pra exportar parametros que estão em outra pagina, passando o mesmo nome, tipo e conteudo(se tiver)
interface InviteGuestsModalProps {
   switchGuestsModal: () => void
   emailsToInvite: string[]
   removeEmailFromInvites: (email: string) => void
   addNewEmailToInvites: (event: FormEvent<HTMLFormElement>) => void
}
export function InviteGuestsModal({
   //Desestruturação dos parametros a serem exportados
   switchGuestsModal, emailsToInvite,
   removeEmailFromInvites, addNewEmailToInvites
}: InviteGuestsModalProps) {

   return (
      <div className="flex items-center justify-center fixed inset-0 bg-black/60">
          <div className="w-[640px] space-y-5 rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="textlg font-semibold">Selecionar Convidados</h2>
                <button onClick={switchGuestsModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => {
                return (
                  <div
                    key={email}
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-zinc-800"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button
                      type="button"
                      onClick={() => removeEmailFromInvites(email)}
                    >
                      <X className="size-4 text-zinc-400" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            {/* Send Email Input */}
            <form
              onSubmit={addNewEmailToInvites}
              className="flex items-center gap-2 p-2.5 rounded-lg border bg-zinc-950 border-zinc-800"
            >
              <div className="flex flex-1 items-center px-2 gap-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado..."
                  className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
                />
              </div>
              
              <GlobalButton type="submit">
                Convidar
                <Plus className="size-5" />
              </GlobalButton>
            </form>
          </div>
        </div>
   )
}