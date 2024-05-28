import nodemailer, { Transporter } from "nodemailer";
import { IClaim } from "../types/IClaim";

const SMTP_HOST: string = process.env.SMTP_HOST || "";
const SMTP_PORT: number = Number(process.env.SMTP_PORT) || 0;
const SMTP_USER: string = process.env.SMTP_USER || "";
const SMTP_PASS: string = process.env.SMTP_PASS || "";

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  throw new Error("SMTP data error imported from .env");
}

const connection = {
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  user: SMTP_USER,
  pass: SMTP_PASS,
};

class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: connection.host,
      port: connection.port,
      secure: true,
      requireTLS: true,
      auth: {
        user: connection.user,
        pass: connection.pass,
      },
      logger: true,
    });
  }

  async sendMailClaim(claim: IClaim) {
    const result = await this.transporter.sendMail({
      from: `${connection.user}@yandex.ru`,
      to: `${connection.user}@yandex.ru`,
      subject: 'Новая заявка с сайта "Твоя Кухня"',
      html: `
          <div>
            <h1>Новая заявка!</h1>
            ${claim.firstName ? `<p><b>Имя</b>: ${claim.firstName}</p>` : ""}
            ${
              claim.email
                ? `<p>Почта: <a href=${"mailto:" + claim.email}></a>${
                    claim.email
                  }</p>`
                : ""
            }
            <p><b>Номер телефона</b>: ${claim.mobilePhone}</p>
            ${claim.tag ? `<p><b>Тег</b>: ${claim.tag}</p>` : ""}
            ${
              claim.location
                ? `<p><b>Расположение формы</b>: ${claim.location}</p>`
                : ""
            }
            <p><b>Дата заявки</b>: ${new Date(claim.date).toLocaleString(
              "ru",
            )}</p>
            ${
              claim.files
                ? `<p><b>Файлы</b>: ${claim.files.length} шт.</p>`
                : ""
            }
          </div>
        `,
    });

    console.log(result.response);
  }
}

export default new MailService();
