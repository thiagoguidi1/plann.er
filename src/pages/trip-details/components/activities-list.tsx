import { CircleCheck } from "lucide-react";

export function ActivitiesList() {
  return (
    <div className="space-y-8">
      {/* Day X */}
      <div className="space-y-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-zinc-300">Dia 17</span>
          <span className="text-xs text-zinc-500">Sábado</span>
        </div>
        {/* Activity */}
        <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
      </div>

      {/* Day X */}
      <div className="space-y-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-zinc-300">Dia 18</span>
          <span className="text-xs text-zinc-500">Domingo</span>
        </div>
          {/* Activity */}
        <div className="space-y-2.5">
          <div className="flex items-center px-4 py-2.5 gap-3 rounded bg-zinc-900 shadow-shape">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
          </div>
        </div>

          {/* Activity */}
        <div className="space-y-2.5">
          <div className="flex items-center px-4 py-2.5 gap-3 rounded bg-zinc-900 shadow-shape">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
          </div>
        </div>
      </div>
    </div>
  )
}