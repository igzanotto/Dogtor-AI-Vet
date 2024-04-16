"use client";

import { useChat } from "ai/react";

import Image from "next/image";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  console.log(messages);

  return (
    <section>
      <section className="flex justify-center items-center h-screen">
        <div className="w-1/4 mt-">
          <Image
            src="/dog_doctor_logos.png"
            alt="Dog Doctor"
            width={500} 
            height={500}
          />
        </div>
        <div className="" style={{ width: '500px' }}>
          <h1 className="text-2xl font-bold text-black">Dogtor</h1>
          <p className="my-2">
            Cuentame que le pasa a tu peludito asi puedo ayudarte!
          </p>
          <form onSubmit={handleSubmit} className="">
            <div className="max-h-96 h-full overflow-y-auto ">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col mb-2 p-2 rounded-md ${
                    m.role === "assistant"
                      ? "self-end bg-slate-100"
                      : "self-start bg-slate-200"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      m.role === "assistant" 
                      ? "text-right font-bold" 
                      : "text-left font-bold"
                    }`}
                  >
                    {m.role === "assistant"
                      ? "dogtor"
                      : "tú"}
                  </span>{" "}
                  {m.content}
                </div>
              ))}
            </div>

            <textarea
              rows={4}
              value={input}
              onChange={handleInputChange}
              className="text-black bg-rose-100 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
              placeholder="mi perrito acaba de vomitar, que tengo que hacer?"
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
        </div>
      </section>
    </section>
  );
}
