"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function LegalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 py-12 px-5 text-center text-sm text-zinc-400">
      <div className="mx-auto max-w-4xl">
        {/* Aviso Legal principal aberto no rodapé (Exigência de Plataformas) */}
        <p className="mb-6 text-[11px] leading-relaxed text-zinc-400">
          <strong>Aviso Legal:</strong> O "Treinamento Preparatório para a Prova da CNH de Primeira" é um curso livre e
          preparatório de caráter educacional. Este site não possui nenhum
          vínculo com o Governo Federal, Ministério da Infraestrutura, SENATRAN,
          DETRAN ou qualquer órgão governamental. A compra e o estudo deste
          material não isentam o aluno da obrigatoriedade de cumprir a carga
          horária oficial nas autoescolas (CFCs), realizar os exames médicos e
          psicológicos, e pagar as taxas estaduais exigidas para a obtenção da
          Carteira Nacional de Habilitação. Os resultados e o desempenho na
          prova oficial dependem do esforço individual de cada candidato.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium md:gap-8">
          {/* Modal Políticas de Privacidade */}
          <Dialog>
            <DialogTrigger className="transition-colors hover:text-white underline-offset-4 hover:underline">
              Políticas de Privacidade
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] w-[95vw] max-w-2xl flex flex-col overflow-hidden bg-white text-zinc-600 sm:w-full">
              <DialogHeader className="shrink-0 pb-2">
                <DialogTitle className="text-xl font-bold text-zinc-950">
                  Políticas de Privacidade
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-sm leading-relaxed">
                <p>
                  A sua privacidade é importante para nós. É política do{" "}
                  <strong>Treinamento Preparatório para a Prova da CNH de Primeira</strong> respeitar a sua
                  privacidade em relação a qualquer informação sua que possamos
                  coletar em nosso site.
                </p>
                <h3 className="font-bold text-zinc-900">
                  1. Coleta e Uso de Informações
                </h3>
                <p>
                  Solicitamos informações pessoais apenas quando realmente
                  precisamos delas para lhe fornecer um serviço (como a entrega
                  do acesso ao curso). Fazemo-lo por meios justos e legais, com
                  o seu conhecimento e consentimento.
                </p>
                <h3 className="font-bold text-zinc-900">2. Retenção de Dados</h3>
                <p>
                  Apenas retemos as informações coletadas pelo tempo necessário
                  para fornecer o serviço solicitado. Quando armazenamos dados,
                  protegemos dentro de meios comercialmente aceitáveis para
                  evitar perdas e roubos, bem como acesso, divulgação, cópia,
                  uso ou modificação não autorizados.
                </p>
                <h3 className="font-bold text-zinc-900">3. Compartilhamento</h3>
                <p>
                  Não compartilhamos informações de identificação pessoal
                  publicamente ou com terceiros, exceto com as plataformas de
                  pagamento (Gateway) estritamente para o processamento da
                  compra, ou quando exigido por lei.
                </p>
                <h3 className="font-bold text-zinc-900">4. Seus Direitos</h3>
                <p>
                  Você é livre para recusar a nossa solicitação de informações
                  pessoais, entendendo que talvez não possamos fornecer alguns
                  dos serviços desejados. Se você tiver alguma dúvida sobre como
                  lidamos com dados do usuário, entre em contato conosco.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Modal Termos de Serviço */}
          <Dialog>
            <DialogTrigger className="transition-colors hover:text-white underline-offset-4 hover:underline">
              Termos de Serviço
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] w-[95vw] max-w-2xl flex flex-col overflow-hidden bg-white text-zinc-600 sm:w-full">
              <DialogHeader className="shrink-0 pb-2">
                <DialogTitle className="text-xl font-bold text-zinc-950">
                  Termos de Serviço
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-sm leading-relaxed">
                <p>
                  Ao acessar o site <strong>Treinamento Preparatório para a Prova da CNH de Primeira</strong>,
                  você concorda em cumprir estes termos de serviço, todas as leis e
                  regulamentos aplicáveis e concorda que é responsável pelo
                  cumprimento de todas as leis locais aplicáveis.
                </p>
                <h3 className="font-bold text-zinc-900">1. Uso da Licença</h3>
                <p>
                  É concedida permissão para o acesso individual e intransferível
                  às aulas e materiais do treinamento, exclusivamente para uso
                  pessoal e não comercial. O compartilhamento de senhas ou a
                  venda do acesso a terceiros resultará no bloqueio imediato da
                  conta sem direito a reembolso.
                </p>
                <h3 className="font-bold text-zinc-900">2. Política de Reembolso</h3>
                <p>
                  Conforme a legislação brasileira de proteção ao consumidor e
                  nossa garantia incondicional oferecida na página de vendas, o
                  aluno tem o direito de solicitar o cancelamento e o reembolso
                  integral do valor pago dentro de <strong>15 dias</strong> após a
                  compra, caso não esteja satisfeito com o material. O reembolso
                  deve ser solicitado diretamente pela plataforma de pagamento.
                </p>
                <h3 className="font-bold text-zinc-900">3. Isenção de Responsabilidade</h3>
                <p>
                  Os materiais são fornecidos 'como estão'. O treinamento não
                  promete resultados milagrosos. A aprovação no exame teórico do
                  Detran depende única e exclusivamente da dedicação, tempo de
                  estudo e capacidade de interpretação do aluno durante a prova
                  oficial.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <span className="hidden text-zinc-700 md:inline">|</span>

          <span className="block w-full md:inline md:w-auto">
            © {currentYear} Treinamento Preparatório para a Prova da CNH de Primeira. Todos os direitos reservados.
            <br className="md:hidden" />
            <span className="md:ml-2 text-zinc-400">CNPJ: 57.204.649/0001-41</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
