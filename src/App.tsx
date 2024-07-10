import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function App() {

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  // Muda o estado de isGuestsInputOpen para o contrário de seu estado atual. (se estiver false vira true e vice-versa)
  function switchGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen);
  }

  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  // Muda o estado de isGuestsModalOpen para o contrário de seu estado atual. (se estiver false vira true e vice-versa)
  function switchGuestsModal() {
    setIsGuestsModalOpen(!isGuestsModalOpen);
  }

  const [emailsToInvite, setEmailsToInvite] = useState([
    'thiagoguidi@outlook.com',
    'agathalinhares@outlook.com'
  ]);

  // Passamos o evento de formulario para o parametro event e <especificamos> que é um elemento form html
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    // Previnimos o refresh na pagina
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    //email recebe algum name="email" em algum formulario
    const email = data.get('email')?.toString();

    //Se o usuario nao preencher nada no email, não faz nada
    if (!email) {
      return
    }

    //Se o email ja foi convidado, cancela a operação
    if (emailsToInvite.includes(email)) {
      alert("Esse e-mail já foi convidado!");
      event.currentTarget.reset();
      return
    }

    //Função pra puxar (...) todos os emails e adicionar o novo email
    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])
    //reseta o input de email
    event.currentTarget.reset();
  }
  
  //Remover email da lista, recebendo o email como parametro
  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      {/* Contents */}
      <div className="max-w-3xl w-full px-6 space-y-10 text-center">
      {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <img src="../public/planner-logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="h-16 flex items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
            {/* Map Input */}
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400"/>
              <input disabled={isGuestsInputOpen == true} type="text" placeholder="Para onde você vai?" className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"/>
            </div>

            {/* Calendar Input */}
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input disabled={isGuestsInputOpen == true} type="text" placeholder="Quando?" className="w-40 bg-transparent text-lg outline-none placeholder-zinc-400"/>
            </div>

            <div className="w-px h-6 bg-zinc-700"></div>

            {/* isGuestsInputOpen é verdadeiro? */}
            {isGuestsInputOpen ? (
              // Se sim, faz isso
              <button onClick={switchGuestsInput} className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
                Alterar local/data
              <Settings2 className="size-5"/>
              </button>
            )
            : (
              // Se não, faz isso
              <button  onClick={switchGuestsInput} className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400">
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {/* Se o valor de isGuestsInputOpen for verdadeiro, faz algo entre ( ) */}
          {isGuestsInputOpen && (
            <div className="h-16 flex items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
              <button type="button" onClick={switchGuestsModal} className="flex flex-1 items-center gap-2">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="flex-1 text-left text-lg bg-transparent text-zinc-400">Quem estará na viagem?</span>
              </button>

              <div className="w-px h-6 bg-zinc-700" />

              <button className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

        {/* Modal Add Emails */}
        {/* Se o valor de isGuestsModalOpen for verdadeiro, faz algo entre ( ) */}
        {isGuestsModalOpen && (
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
                  Os convidados irão receber e-mails para confirmar a participação na viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {emailsToInvite.map(email => {
                  return (
                    <div key={email} className="flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-zinc-800">
                      <span className="text-zinc-300">{email}</span>
                      <button type="button" onClick={() => removeEmailFromInvites(email)}>
                        <X className="size-4 text-zinc-400"/>
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="w-full h-px bg-zinc-800" />
              
              {/* Send Email Input */}
              <form onSubmit={addNewEmailToInvite} className="flex items-center gap-2 p-2.5 rounded-lg border bg-zinc-950 border-zinc-800">
                <div className="flex flex-1 items-center px-2 gap-2">
                  <AtSign className="size-5 text-zinc-400"/>
                  <input type="email" name="email" placeholder="Digite o e-mail do convidado..." className="flex-1 bg-transparent text-lg outline-none placeholder-zinc-400"/>
                </div>

                <button  type="submit" className="flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400">
                  Convidar
                  <Plus className="size-5" />
                </button>
              </form>
            </div>
          </div>
        )}
    </div>
  )
}


