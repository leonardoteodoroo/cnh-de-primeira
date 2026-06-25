"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function OfferBuildUp() {
  const stackItems = [
    {
      item: "Treinamento Preparatório para a Prova da CNH de Primeira (13h+ de aulas)",
      value: "R$ 197",
      type: "price",
    },
    {
      item: "Simulados Comentados (As pegadinhas reveladas)",
      value: "R$ 97",
      type: "price",
    },
    {
      item: "Plano de Estudo Módulo a Módulo",
      value: "R$ 47",
      type: "price",
    },
    {
      item: "Suporte para Dúvidas",
      value: "Incluso",
      type: "included",
    },
    {
      item: "Acesso Imediato pelo Celular ou PC",
      value: "Incluso",
      type: "included",
    },
    // {
    //   item: "Custo de UM ÚNICO reteste no Detran",
    //   value: "R$ 90 a R$ 180",
    //   type: "highlight",
    // },
  ];

  return (
    <section className="bg-white px-5 pt-20 pb-12 md:px-8 md:pt-32 md:pb-16 relative overflow-hidden">
      <ScrollReveal className="mx-auto max-w-2xl">
        <h3 className="text-2xl font-black text-zinc-900 text-center mb-8 flex items-center justify-center gap-3 md:text-3xl tracking-tight">
          O que você está levando:
        </h3>

        <div className="space-y-1 mb-10">
          {stackItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between py-3.5 border-b border-zinc-100 last:border-b-0"
            >
              <div className="flex items-center gap-3 pr-4">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 shrink-0" />
                <span className={`text-sm md:text-base font-medium ${item.type === 'highlight' ? 'text-zinc-950 font-bold' : 'text-zinc-700'}`}>
                  {item.item}
                </span>
              </div>
              <span
                className={`text-sm md:text-base font-bold whitespace-nowrap ${item.type === "price"
                    ? "text-zinc-400 line-through decoration-zinc-300"
                    : item.type === "highlight"
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}
              >
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Justificativa e Transição */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center text-center justify-center pt-6 px-2"
        >
          {/* <h4 className="text-xl md:text-2xl font-bold text-zinc-900 mb-6 leading-tight">
            Somando tudo, o valor de uma preparação sólida ultrapassa facilmente os R$ 300.
          </h4> */}

          <div className="text-[15px] md:text-base text-zinc-600 space-y-4 max-w-xl mx-auto leading-relaxed">
            {/* <p>
              Pior ainda: esse é o valor que você gasta <strong>só em taxas</strong> se reprovar uma única vez e precisar remarcar a prova.
            </p>
            <p>
              Mas eu conheço a realidade de quem está tirando a primeira habilitação. Você já pagou Duda, autoescola, exames médicos... cada centavo conta.
            </p> */}
            <p className="font-bold text-zinc-900 pt-2">
              Então, por que o preço abaixo está bloqueado?
            </p>
            <p>
              Porque eu não quero curiosos julgando o material pelo valor. Eu quero apenas alunos que entenderam o método e decidiram passar de primeira.
            </p>
            <p className="text-zinc-900 font-medium">
              Quando você liberar o cadeado abaixo, vai perceber que a clareza e a segurança para a sua prova custam muito menos do que a taxa de uma reprovação.
            </p>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
