import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function getTripDetails(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId', 
    {
    //Validação de dados com o zod
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
    }
  }, async (req) => {
    const { tripId } = req.params
    
    const trip = await prisma.trip.findUnique({
      //Quais campos eu quero do bancod e dados?
      select: {
        id: true,
        destination: true,
        starts_at: true,
        ends_at: true,
        is_confirmed: true,
      },
      where: { id: tripId }
    })

    //Se a viagem nao exisitir, retorna um erro
    if (!trip) {
      throw new Error('Trip not found')
    }

    
    return { trip }
  });
}