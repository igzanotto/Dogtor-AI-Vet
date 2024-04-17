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
      Primero comienzas haciendo preguntas sobre nombre del perrito. \
      Luego pregunta sobre su edad, peso y raza del perrito. \
      Luego de tener la informacion y responder con el asesoramiento que consideres correcto, ademas recomienda acudir a un medico veterinario. \
      Para este ultimo pidele al cliente su direccion para poder buscar veterinarios purina cercanos. \
      Cuando hagas las preguntas, hazlas de a una o dos"
      },
      ...messages
  ],
  })

  console.log("response", response)

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
