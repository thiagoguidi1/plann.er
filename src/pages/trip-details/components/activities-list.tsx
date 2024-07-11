import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export function ActivitiesList() {

  const { tripId } = useParams();
  //Ira salvar um objeto igual a interface Participant ou undefined
  const [activities, setActivities] = useState<Activity[]>([]);

  //O primeiro parametro só ira executar dnv caso o segundo parametro (tripId) mude
  useEffect(() => {
    api.get(`/trips/${tripId}/activities`)
    .then(res => setActivities(res.data.activities))
  }, [tripId])


  return (
    <div className="space-y-8">

      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-zinc-300">Dia {format(category.date, 'd')}</span>
              <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', {locale: ptBR})}</span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="flex items-center px-4 py-2.5 gap-3 rounded bg-zinc-900 shadow-shape">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occurs_at, 'HH:mm')}h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}