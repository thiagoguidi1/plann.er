import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
    //Validação de dados com o zod
    schema: {
      params: z.object({
       tripId: z.string().uuid(),
      })
    }
  },async (req, reply) => {
    const { tripId } = req.params

    //Lista de participantes da trip, incluindo participants que nao sejam o dono
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        participants: {
          where: {
            is_owner: false,
          }
        }
      }
    })
    //Se nao encontrar a trip retorna um erro
    if (!trip) {
      throw new ClientError('Trip not found.')
    }
    //Se a trip ja esta confirmada, redireciona pro painel da trip
    if (trip.is_confirmed) {
      return reply.redirect(`${env.API_BASE_URL}/trips/${tripId}`)
    }

    //Atualizamos que a viagem está confirmada
    await prisma.trip.update({
      where: { id: tripId },
      data: { is_confirmed: true }
    })

    trip.participants

    //Enviar email pra todos os participas para que eles confirmem
    const formattedStartDate = dayjs(trip.starts_at).format('LL')
    const formattedEndDate = dayjs(trip.ends_at).format('LL')

    

    //Enviar email para criador da trip
    const mail = await getMailClient()

    await Promise.all(
      trip.participants.map(async (participant) => {

        const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

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
      })
    )

    return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`)
  });
}