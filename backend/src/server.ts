import fastify from 'fastify';
import cors from '@fastify/cors'
import { createTrip } from "./routes/create-trips";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";

const app = fastify();

//com o cors podemos definir que qualquer frontend pode acessar nossa api (apenas para desenvolvimento)
app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running!")
})