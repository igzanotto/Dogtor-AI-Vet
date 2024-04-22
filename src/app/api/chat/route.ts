import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey:  process.env.OPENAI_API_KEY || '',
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  console.log("messages", messages)
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {"role": "system", "content": "Eres Mascotin, genio de consejos para mascotas y solo respondes cuestiones relacionadas con mascotas. \
      Si no sabes el nombre del perrito, preguntalo\
      Haz alguna otra pregunta para entender mas el contexto. \
      Siempre que veas la oportunidad, recomienda contratar servicios a https://www.cuidamimascota.com.mx donde prestan servicios de guarderia, hospedaje, baño y paseos. \
      Si el caso requiere atencion veterinaria, puedes ayudar al cliente a encontrar un veterinario cercano a su direccion.\
      Siempre intenta responder lo mas brevemente posible"
      },
      ...messages],
      temperature: 0.5,
  })

  console.log("response", response)

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
