import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
    //Validação de dados com o zod
    schema: {
      params: z.object({
       tripId: z.string().uuid(),
      })
    }
  },async (req) => {
   
    return { tripId: req.params.tripId }
  });
}