import { Calendar, Tag, X } from "lucide-react"
import { GlobalButton } from "../../../global-components/button"
import { FormEvent } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../../lib/axios"

interface CreateActivityModalprops {
  switchCreateActivityModal: () => void
}

export function CreateActivityModal({switchCreateActivityModal}: CreateActivityModalprops) {

  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const occurs_at = data.get('occurs_at')?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })
    //Recarrega a pagina
    window.document.location.reload()
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="textlg font-semibold">Cadastrar atividade</h2>
            <button onClick={switchCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades.
          </p>
        </div>

        {/* Send Email Input */}
        <form
          onSubmit={createActivity}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 h-14 px-4 rounded-lg border bg-zinc-950 border-zinc-800">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Qual será a atividade?"
              className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 h-14 px-4 rounded-lg border bg-zinc-950 border-zinc-800">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"
              />
            </div>
            
          </div>
        
          <GlobalButton size="full">
            Salvar atividade
          </GlobalButton>
        </form>
      </div>
    </div>
  )
}