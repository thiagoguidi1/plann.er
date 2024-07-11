import { CircleDashed, UserCog } from "lucide-react";
import { GlobalButton } from "../../../global-components/button";

export function GuestsList() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      {/* Guest List */}
      <div className="space-y-5">
        {/* Guest X */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Thiago Guidi</span>
            <span className="block text-sm text-zinc-400 truncate">
              thiagoguidi@outlook.com
            </span>
          </div>
          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>

        {/* Guest X */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Agatha Linhares</span>
            <span className="block text-sm text-zinc-400 truncate">
              agathalinhares@outlook.com
            </span>
          </div>
          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>
      
      {/* Register Button Link  */}
      <GlobalButton variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </GlobalButton>
    </div>
  )
}