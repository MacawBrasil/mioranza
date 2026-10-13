import { sendEmail } from "../../../lib/smtp-mail";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { FormSchema } from "@/utilities/schema";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = FormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error?.message },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "settings",
      locale: "pt",
      depth: 2,
      fallbackLocale: "pt",
    });

    const dests = settings?.destinatarios?.map((dest) => dest.email!);

    try {
      await sendEmail({
        to: dests,

        subject: `Nova mensagem vinda do site Mioranza - Contato`,
        replyTo: result.data.email,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html lang="pt">
            <body>
              <div style="margin-left: 20px;margin-right: 20px; font-family: sans-serif;">
                <p><b>Nome:</b> ${result.data.nome}</p>
                <p><b>E-mail:</b> ${result.data.email}</p>
                <p><b>Telefone:</b> ${result.data.telefone}</p>
                <p><b>Cidade:</b> ${result.data.cidade}</p>
                <p><b>UF:</b> ${result.data.uf}</p>
                ${
                  result.data.mensagem &&
                  `<div style="font-size: 16px;">
                <b>Mensagem:</b><br />
                <p>${result.data.mensagem}</p>
              </div>`
                }
              </div>
            </body>
          </html>`,
      });

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error: unknown) {
      return NextResponse.json({ error: true }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao processar requisição" },
      { status: 500 },
    );
  }
}
