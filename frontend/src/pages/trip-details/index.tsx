import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./components/create-activity-modal";
import { ImportantLinks } from "./components/important-links";
import { GuestsList } from "./components/guests-list";
import { ActivitiesList } from "./components/activities-list";
import { DestinationAndDateHeader } from "./components/destination-and-date-header";
import { GlobalButton } from "../../global-components/button";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen ] = useState(false);

  function switchCreateActivityModal() {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  }

   return (
      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
        {/* Header */}
        <DestinationAndDateHeader />
        {/* Body */}
        <main className="flex px-4 gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Atividades</h2>
              <GlobalButton onClick={switchCreateActivityModal}>
                Cadastrar Atividade
                <Plus className="size-5" />
              </GlobalButton>
              
            </div>

            {/* Days Activities List*/}
            <ActivitiesList />
          </div>
          
          {/* Right Content */}
          <div className="w-80 space-y-6">
            {/* Links */}
            <ImportantLinks />

            <div className="w-full h-px bg-zinc-800" />

            {/* Guests List */}
            <GuestsList />
          </div>
        </main>

        {isCreateActivityModalOpen && (
          <CreateActivityModal 
            switchCreateActivityModal={switchCreateActivityModal}
          />
        )}
      </div>
   )
}