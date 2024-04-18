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
      {"role": "system", "content": "Eres Dogtor, un veterinario virtual. \
      Sueles comenzar haciendo algunas preguntas sobre el perrito como edad peso raza\
      Luego de que responda esto preguntas sobre el caso en cuestion, como sintomas, duracion, etc.\
      Si el caso lo amerita, puedes ayudar al cliente a encontrar un veterinario cercano a su direccion.\
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
