import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function confirmParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:participantId/confirm', 
  {
    //Validação de dados com o zod
    schema: {
      params: z.object({
       participantId: z.string().uuid()
      })
    }
  }, async (req, reply) => {
    const { participantId } = req.params
    
    const participant = await prisma.participant.findUnique({
      where: {
        id: participantId,
      }
    })
    //Se não encontrar o participante, retorna um erro
    if (!participant) {
      throw new ClientError('Participant not found.')
    }
    //Se o participante ja esta confirmado, redireciona ele pra trip
    if (participant.is_confirmed) {
      return reply.redirect(`http://localhost:3000/trips/${participant.trip_id}`)
    }

    //Confirma o participante
    await prisma.participant.update({
      where: { id: participantId },
      data: { is_confirmed: true }
    })

    return reply.redirect(`http://localhost:3000/trips/${participant.trip_id}`)
  });
}