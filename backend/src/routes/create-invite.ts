import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer'
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/invites', 
    {
    //Validação de dados com o zod
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
      body: z.object({
        email: z.string().email()
      })
    }
  }, async (req) => {
    const { tripId } = req.params
    const { email } = req.body
    
    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    //Se a viagem nao exisitir, retorna um erro
    if (!trip) {
      throw new ClientError('Trip not found')
    }
    
    //Se existe irei criar o participante passando o email
    const participant = await prisma.participant.create({
      data: {
        email,
        trip_id: tripId
      }
    })

    const formattedStartDate = dayjs(trip.starts_at).format('LL')
    const formattedEndDate = dayjs(trip.ends_at).format('LL')

    

    //Enviar email para criador da trip
    const mail = await getMailClient()

    const confirmationLink = `${env.WEB_BASE_URL}participants/${participant.id}/confirm`

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'equipe@plann.er'
      },
      to: participant.email,
      subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}.`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong>, nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong></p>
          <p></p>
          <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
          <p></p>
          <p>
            <a href="${confirmationLink}">Confirmar viagem</a>
          </p>
          <p></p>
          <p>Caso esteja usando o dispositivo móvel, você também pode confirmar a sua presença na  viagem pelos aplicativos:</p>
          <p></p>
          <p>Aplicativo para iPhone</p>
          <p>Aplicativo para Android</p>
          <p></p>
          <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
        </div>
      `.trim()
    })
    console.log(nodemailer.getTestMessageUrl(message));    

    return { participantId: participant.id }
  });
}