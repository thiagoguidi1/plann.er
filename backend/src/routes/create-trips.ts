import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer';

dayjs.locale('pt-br')
dayjs.extend(localizedFormat);

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
        emails_to_invite: z.array(z.string().email()),
      })
    }
  },async (req) => {
    const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } = req.body
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

    

    //Cria as informações da trip
    const trip = await prisma.trip.create({
      data: {
        destination,
        starts_at,
        ends_at,
        //Cria as informações do dono da trip
        participants: {
          createMany: {
            //Passa as informações do dono da trip
            data: [
              {
                name: owner_name,
                email: owner_email,
                is_owner: true,
                is_confirmed: true
              },
              //Pega as infos do array e joga pra cima (no caso dentro do data)
              ...emails_to_invite.map(email => {
                return { email }
              })
            ]
          }
        }
      }
    })
    
    const formattedStartDate = dayjs(starts_at).format('LL')
    const formattedEndDate = dayjs(ends_at).format('LL')
    
    const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`

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
      subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}.`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong>, nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong></p>
          <p></p>
          <p>Para confirmar sua viagem, clique no link abaixo:</p>
          <p></p>
          <p>
            <a href="${confirmationLink}">Confirmar viagem</a>
          </p>
          <p></p>
          <p>Caso esteja usando o dispositivo móvel, você também pode confirmar a criação da viagem pelos aplicativos:</p>
          <p></p>
          <p>Aplicativo para iPhone</p>
          <p>Aplicativo para Android</p>
          <p></p>
          <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
        </div>
      `.trim()
    })
    console.log(nodemailer.getTestMessageUrl(message));

    return { tripId: trip.id }
  });
}