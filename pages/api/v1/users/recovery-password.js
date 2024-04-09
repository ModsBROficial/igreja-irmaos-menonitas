import { mongooseConnect } from "@/lib/mongoose";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import { User } from "@/models/User";
import formatName from "@/lib/formatName"

export default async function RecoveryPassword(req, res, next) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {

        const { email } = req.body
        if (!email) return res.status(400).json({ message: { type: "error", data: "Email não pode ficar vazio" } })
        if (!email.includes("@")) return res.status(400).json({ message: { type: "error", data: "Entre em contado com administrador do sistema" } })

        const text = "A1B2C3"
        const newPass = await bcrypt.hash(text, 12)

        try {
            const user = await User.findOne({ email: email })
            if (!user) return res.status(400).send({ message: { type: "error", data: "Usuário não encontrado" } })

            const newHash = await bcrypt.hash(newPass, 12)

            user.password = newHash
            await user.save()

            const message = `
            <table width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                <td align="center" valign="top" bgcolor="#ffffff" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:13px;line-height:normal;font-weight:normal">
                  <table width="100%" border="0" cellspacing="0" cellpadding="20">
                    <tbody>
                      <tr>
                        <td bgcolor="#042550">
                          <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td align="center" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:22px;line-height:100%;color:#FFFFFF;font-weight:bold;text-decoration:none;padding-top:10px;padding-bottom:10px">
                                Igreja Irmãos Menonitas
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
                  </tr>
                  <tr>
                  <td width="600" align="center" valign="top" bgcolor="#ffffff" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:13px;line-height:normal;font-weight:normal"><table width="100%" border="0" cellspacing="0" cellpadding="30">
                <tbody>
                <tr>
                  <td bgcolor="#ffffff"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="left" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:18px;line-height:150%;color:#666e7a;font-weight:normal;text-decoration:none;padding-left:23px;padding-right:23px;padding-top:30px;padding-bottom:10px">
                            <strong> Olá, ${formatName(user?.name)}.</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="left" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:15px;line-height:150%;color:#666e7a;font-weight:normal;text-decoration:none;padding-left:23px;padding-right:23px;padding-top:10px;padding-bottom:20px">
                            <br>
                            <strong> Informações de segurança</strong>
                            <br>
                            <br>
                            Identificamos que solicitou a redefinição de senha.
                            <br>
                            <br>
                            <strong> Para redefinir a sua senha, é só clicar no botão abaixo e criar uma nova senha.</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                   </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          
          
          <tr>
            <td align="center" valign="top" bgcolor="#FFFFFF" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:13px;line-height:normal;font-weight:normal;padding-bottom:20px">
              <table border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td height="44" align="center" bgcolor="#FF6B05" style="border-radius:4px;padding-left:48px;padding-right:48px;padding-top:0;padding-bottom:0">
                      <a href='https://www.igrejairmaosmenonitas.com/new-password?token=${newPass}&email=${user?.email}' style="font-size:12px;font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-weight:bold;color:#FFFFFF;letter-spacing:1.5px;line-height:22px;text-decoration:none" target="_blank" data-saferedirecturl="https://www.igrejairmaosmenonitas.com">
                        REDEFINIR SENHA
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

		      <tr>
            <td width="600" align="center" valign="top" bgcolor="#ffffff" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:13px;line-height:normal;font-weight:normal"><table width="100%" border="0" cellspacing="0" cellpadding="30">
                <tbody>
                  <tr>
                    <td bgcolor="#ffffff">
                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

                      </table>
                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td align="left" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:15px;line-height:150%;color:#666e7a;font-weight:normal;text-decoration:none;padding-left:23px;padding-right:23px;padding-top:0px;padding-bottom:30px">
                              Se você não solicitou a redefinição de senha, entre em contato com o administrador do sistema.
                              <br>
                              <br>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" valign="top" bgcolor="#ffffff" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:13px;line-height:normal;font-weight:normal">
              <table width="100%" border="0" cellspacing="0" cellpadding="20">
                <tbody>
                  <tr>
                    <td bgcolor="#042550">
                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td>

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

            <tr>
              <td height="10" align="center" valign="top" bgcolor="#FF6B05" style="font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:13px;line-height:normal;font-weight:normal;height:10px"> </td>
            </tr>
          </tbody>
        </table>
        `

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "nascimentotalesdev@gmail.com",
                    pass: "uiofswaplqzkbund"
                }
            })
            transporter.sendMail({
                from: "Igreja Irmaos Menonitas <contato@igrejairmaosmenonitas.com>",
                to: email,
                subject: "Redefinir senha",
                html: message
            })
                .then(() => res.send({ message: { type: "success", data: "Email de recuperação enviado" } }))
                .catch((err) => res.send({ err, message: { type: "Error", data: "Falha no envio do email." } }))

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } })
        }
    }
}