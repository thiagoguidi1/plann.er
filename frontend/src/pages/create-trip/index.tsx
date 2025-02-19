import { FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./components/invite-guests-modal";
import { ConfirmTripModal } from "./components/confirm-trip-modal";
import { DestinationAndDateStep } from "./components/destination-and-date-step";
import { InviteGuestsStep } from "./components/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTipPage() {

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
  function addNewEmailToInvites(event: FormEvent<HTMLFormElement>) {
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

  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen]  = useState(false);

  function switchTripModal() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
  }

  const navigate = useNavigate();

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(destination);
    console.log(ownerName);
    console.log(ownerEmail);
    console.log(eventStartAndEndDates);
    console.log(emailsToInvite)

    //Se nao existir um destino, cancela
    if (!destination) {
      return
    }
    //Se nao existir uma data, cancela
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }
    //Se o usuario não convidou ninguém, cancela
    if (emailsToInvite.length === 0) {
      return
    }
    //Se o usuario nao preencheu o nome e email, cancela
    if (!ownerName || !ownerEmail) {
      return
    }


    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data
    navigate(`/trips/${tripId}`)
  }


  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      {/* Contents */}
      <div className="max-w-3xl w-full px-6 space-y-10 text-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <img src="../public/planner-logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <DestinationAndDateStep 
            isGuestsInputOpen={isGuestsInputOpen}
            switchGuestsInput={switchGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
        

          {/* Se o valor de isGuestsInputOpen for verdadeiro, faz algo entre ( ) */}
          {isGuestsInputOpen && (
            <InviteGuestsStep 
              switchGuestsModal={switchGuestsModal}
              emailsToInvite={emailsToInvite}
              switchTripModal={switchTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
          com os nossos <a href="#" className="text-zinc-300 underline">termos de uso </a>e
          <a href="#" className="text-zinc-300 underline"> políticas de privacidade</a>.
        </p>
      </div>

      {/* Modal Add Emails */}
      {/* Se o valor de isGuestsModalOpen for verdadeiro, faz algo entre ( ) */}
      {isGuestsModalOpen && (
        //Importa o componente com as propriedades dessa pagina
        <InviteGuestsModal 
          switchGuestsModal={switchGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
          addNewEmailToInvites={addNewEmailToInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        //Importa o componente com as propriedades dessa pagina
        <ConfirmTripModal
          switchTripModal={switchTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}