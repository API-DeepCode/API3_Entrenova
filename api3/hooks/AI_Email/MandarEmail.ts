import { createRequire } from "module";
const require = createRequire(import.meta.url);

// importa pacotes CommonJS corretamente:
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");
/**
 * Exemplo de relatório gerado.
 */
const resultado: string = `
Relatório de análise:
- Cliente: João Silva
- Data: 09/10/2025
- Resultado da IA: O cliente possui alto engajamento nas campanhas.
`;

/**
 * Gera um arquivo PDF com o conteúdo informado.
 * @param conteudo Conteúdo textual do relatório
 * @param nomeArquivo Nome do arquivo PDF a ser salvo
 * @returns Promise que resolve com o nome do arquivo gerado
 */
function gerarPDF(conteudo: string, nomeArquivo: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(nomeArquivo);

    doc.pipe(stream);
    doc.fontSize(14).text(conteudo, { align: "left" });
    doc.end();

    stream.on("finish", () => resolve(nomeArquivo));
    stream.on("error", reject);
  });
}

/**
 * Envia um e-mail com o arquivo PDF gerado em anexo.
 * @param destinatario Endereço de e-mail do destinatário
 * @param arquivo Caminho do arquivo PDF a ser anexado
 */
async function enviarEmailComAnexo(destinatario: string, arquivo: string): Promise<void> {
  // Configuração do transporte SMTP via variáveis de ambiente
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = (process.env.SMTP_SECURE || 'false') === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || user;

  if (!user || !pass) {
    throw new Error('SMTP credentials are not set (SMTP_USER/SMTP_PASS)');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Relatórios IA" <${from}>`,
    to: destinatario,
    subject: 'Relatório gerado por IA',
    text: 'Segue em anexo o relatório solicitado.',
    attachments: [{ filename: 'relatorio.pdf', path: arquivo }],
  });

  console.log('📧 E-mail enviado com sucesso para', destinatario);
}

/**
 * Execução principal
 */

export async function sendReportEmail(conteudo: string, destinatario: string) {
  const nomeArquivo = `relatorio_${Date.now()}.pdf`;
  try {
    await gerarPDF(conteudo, nomeArquivo);
    await enviarEmailComAnexo(destinatario, nomeArquivo);
  } finally {
    // tenta remover o arquivo temporário se existir
    try { if (fs.existsSync(nomeArquivo)) fs.unlinkSync(nomeArquivo); } catch (e) { /* ignore */ }
  }
}