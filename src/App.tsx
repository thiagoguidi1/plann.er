import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 space-y-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="../public/planner-logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="h-16 flex items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
          <div className="flex flex-1 items-center gap-2">
            <MapPin className="size-5 text-zinc-400"/>
            <input type="text" placeholder="Para onde você vai?" className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"/>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400"/>
            <input type="text" placeholder="Quando?" className="w-40 bg-transparent text-lg outline-none placeholder-zinc-400"/>
          </div>

          <div className="w-px h-6 bg-zinc-700"></div>

          <button className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400">
            Continuar
            <ArrowRight className="size-5" />
          </button>
        
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>  
    </div>
    
  )
}


