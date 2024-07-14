import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { linkSync } from "fs";

export async function getLinks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/links', 
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
        links: true,
      }
    })

    //Se a viagem nao exisitir, retorna um erro
    if (!trip) {
      throw new Error('Trip not found')
    }

    
    return { link: trip.links }
  });
}