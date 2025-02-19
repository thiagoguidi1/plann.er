import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/participants', 
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
      where: { id: tripId },
      include: { 
        participants: {
          //Seleciona oq eu quero de participants
          select: {
            id: true,
            name: true,
            email: true,
            is_confirmed: true,
          }
        }
      }
    })

    //Se a viagem nao exisitir, retorna um erro
    if (!trip) {
      throw new ClientError('Trip not found')
    }

    return { participants: trip.participants }
  });
}