"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  console.log(messages);

  return (
    <section>
       
    
    <section className="flex justify-center items-center h-screen bg-red">
    <img
        src="dog_doctor_logo.png"
        alt="Dog Doctor"
        className="w-50 h-50"
      />

      <form onSubmit={handleSubmit} className="max-w-xl w-full">
        <div className="text-white max-h-96 h-full overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col mb-2 p-2 rounded-md ${
                m.role === "assistant"
                  ? "self-end bg-gray-800"
                  : "self-start bg-blue-700"
              }`}
            >
              <span
                className={`text-xs ${
                  m.role === "assistant" ? "text-right" : "text-left"
                }`}
              >
                {m.role}
              </span>{" "}
              {m.content}
            </div>
          ))}
        </div>

        <div className="flex justify-between my-4">
          <label className="block font-bold my-2">
            Cuentanos sobre tu peludito
          </label>
          
        </div>
        <textarea
          rows={4}
          value={input}
          onChange={handleInputChange}
          className="text-black bg-rose-100 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
          placeholder="Kiara es una labrador de 12 años bastante activa..."
          autoFocus
        />
        <div className="flex justify-end my-4">
        <button
            className="bg-rose-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            disabled={isLoading || !input}
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
    </section>
  );
}
