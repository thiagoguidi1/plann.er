import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";


export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId', {
    //Validação de dados com o zod
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
      body: z.object({
        destination: z.string().min(4),
        //coerce tenta converter
        starts_at: z.coerce.date(),
        ends_at: z.coerce.date(),
      })
    }
  },async (req) => {
    const { tripId } = req.params
    const { destination, starts_at, ends_at } = req.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    //Se a viagem nao exisitir, retorna um erro
    if (!trip) {
      throw new ClientError('Trip not found')
    }

    //Se a data de criação da viagem for antes do dia de hoje
    if (dayjs(starts_at).isBefore(new Date())) {
       //Cria um erro
       throw new ClientError('Invalid trip start date, you must enter a date equal or greater than today.')
    }
    //Se a data de término for menor que a data de criação
    if (dayjs(ends_at).isBefore(starts_at)) {
      //Cria um erro
      throw new ClientError('Invalid trip end date, you must enter a date greater than today.')
    }

    await prisma.trip.update({
      where: { id: tripId },
      data: {
        destination,
        starts_at,
        ends_at
      }
    })

    return { tripId: trip.id }
  });
}