import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/activities', 
    {
    //Validação de dados com o zod
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
      body: z.object({
        title: z.string().min(4),
        occurs_at: z.coerce.date(),
      })
    }
  }, async (req) => {
    const { tripId } = req.params
    const { title, occurs_at } = req.body
    
    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    //Se a viagem nao exisitir, retorna um erro
    if (!trip) {
      throw new ClientError('Trip not found')
    }

    //Se a data da atividade for antes da data de criação da trip, retorna um erro
    if (dayjs(occurs_at).isBefore(trip.starts_at)) {
      throw new ClientError('Invalid activity date, the activity date must be after the trip creation date.')
    }
    //Se a data da atividade for depois da data de termino da trip, retorna um erro
    if (dayjs(occurs_at).isAfter(trip.ends_at)) {
      throw new ClientError('Invalid activity date, the date of the activity must be before the end date of the trip.')
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        occurs_at,
        trip_id: tripId
      }
    })

    return { activityId: activity.id }
  });
}