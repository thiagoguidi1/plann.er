import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from "dayjs";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips', {
    //Validação de dados com o zod
    schema: {
      body: z.object({
        destination: z.string().min(4),
        //coerce tenta converter
        starts_at: z.coerce.date(),
        ends_at: z.coerce.date(),
        owner_name: z.string(),
        owner_email: z.string().email(),
      })
    }
  },async (req) => {
    const { destination, starts_at, ends_at, owner_name, owner_email } = req.body
    //Se a data de inicio da viagem, for antes da data atual de criação
    if (dayjs(starts_at).isBefore(new Date())) {
      //Cria um erro
      throw new Error('Invalid trip start date, you must enter a date equal or greater than today.')
    }
    //Se a data de término for menor que a data de criação
    if (dayjs(ends_at).isBefore(starts_at)) {
      //Cria um erro
      throw new Error('Invalid trip end date, you must enter a date greater than today.')
    }

    const trip = await prisma.trip.create({
      data: {
        destination,
        starts_at,
        ends_at
      }
    })
    
    //Enviar email para criador da trip
    const mail = await getMailClient()
    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'equipe@plann.er'
      },
      to: {
        name: owner_name,
        address: owner_email
      },
      subject: 'Você foi convidado para uma viagem usando nosso sistema de planejamento!',
      html: '<p>Você foi convidado para uma viagem usando nosso sistema de planejamento!</p>'
    })
    console.log(nodemailer.getTestMessageUrl(message));

    return { tripId: trip.id }
  });
}