// import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

import path from "path"



const __dirname = path.resolve();

// ENVIAR UN EMAIL DE CONFIRMACION DE CUENTA DEL REGISTRO
const emailRegistro = async (data) => {
  const { nombre, email, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // infromacion para el email

  const info = await transport.sendMail({
    from: '"Calyaan" <calyaan@gmail.com.com>',
    to: email,
    subject: "Confirma tu cuenta de Calyaan",
    text: "Calyaan",
    attachments: [{
      filename: 'Logo-Calyaan.webp',
      path: __dirname + '/public/images/Logo-Calyaan.webp',
      cid: 'logo'
    }
    ],
    html: `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <title>Bienvenida</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <meta name="format-detection" content="telephone=no" />
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!--<![endif]-->
    <style type="text/css">
      body {
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
      }
  
      img {
        border: 0 !important;
        outline: none !important;
      }
  
      p {
        Margin: 0px !important;
        Padding: 0px !important;
      }
  
      table {
        border-collapse: collapse;
        mso-table-lspace: 0px;
        mso-table-rspace: 0px;
      }
  
      td,
      a,
      span {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
  
      .ExternalClass * {
        line-height: 100%;
      }
  
      span.MsoHyperlink {
        mso-style-priority: 99;
        color: inherit;
      }
  
      span.MsoHyperlinkFollowed {
        mso-style-priority: 99;
        color: inherit;
      }
    </style>
    <style media="only screen and (min-width:481px) and (max-width:599px)" type="text/css">
      @media only screen and (min-width:481px) and (max-width:599px) {
        table[class=em_main_table] {
          width: 100% !important;
        }
  
        table[class=em_wrapper] {
          width: 100% !important;
        }
  
        td[class=em_hide],
        br[class=em_hide] {
          display: none !important;
        }
  
        img[class=em_full_img] {
          width: 100% !important;
          height: auto !important;
        }
  
        td[class=em_align_cent] {
          text-align: center !important;
        }
  
        td[class=em_aside] {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
  
        td[class=em_height] {
          height: 20px !important;
        }
  
        td[class=em_font] {
          font-size: 14px !important;
        }
  
        td[class=em_align_cent1] {
          text-align: center !important;
          padding-bottom: 10px !important;
        }
      }
    </style>
    <style media="only screen and (max-width:480px)" type="text/css">
      @media only screen and (max-width:480px) {
        table[class=em_main_table] {
          width: 100% !important;
        }
  
        table[class=em_wrapper] {
          width: 100% !important;
        }
  
        td[class=em_hide],
        br[class=em_hide],
        span[class=em_hide] {
          display: none !important;
        }
  
        img[class=em_full_img] {
          width: 100% !important;
          height: auto !important;
        }
  
        td[class=em_align_cent] {
          text-align: center !important;
        }
  
        td[class=em_align_cent1] {
          text-align: center !important;
          padding-bottom: 10px !important;
        }
  
        td[class=em_height] {
          height: 20px !important;
        }
  
        td[class=em_aside] {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
  
        td[class=em_font] {
          font-size: 14px !important;
          line-height: 28px !important;
        }
  
        span[class=em_br] {
          display: block !important;
        }
      }
    </style>
  </head>
  
  <body style="margin:0px; padding:0px;" bgcolor="#ffffff">
    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
  
      <!-- === //PRE HEADER SECTION=== -->
      <!-- === BODY SECTION=== -->
      <tr>
        <td align="center" valign="top" bgcolor="#ffffff">
          <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="em_main_table"
            style="table-layout:fixed;">
            <!-- === LOGO SECTION === -->
            <tr>
              <td height="40" class="em_height">&nbsp;</td>
            </tr>
            <tr>
              <td align="center"><a href="#" target="_blank" style="text-decoration:none;"><img
                    src="cid:logo" width="230" height="115"
                    style="display:block;font-family: Arial, sans-serif; font-size:15px; line-height:18px; color:#30373b;  font-weight:bold;"
                    border="0" alt="Logo Calyaan" /></a></td>
            </tr>
            <tr>
              <td height="30" class="em_height">&nbsp;</td>
            </tr>
            <!-- === //LOGO SECTION === -->
            <!-- === NEVIGATION SECTION === -->
          
            <tr>
              <td height="14" style="font-size:1px; line-height:1px;">&nbsp;</td>
            </tr>
            <tr>
              <td align="center"
                style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; line-height:18px; color:#30373b; text-transform:uppercase; font-weight:bold;"
                class="em_font">
                <a href="#" target="_blank" style="text-decoration:none; color:#30373b;">Centro de estética</a>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="_blank"
                  style="text-decoration:none; color:#30373b;">Tienda</a>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="_blank"
                  style="text-decoration:none; color:#30373b;">Blog</a> &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" target="_blank" style="text-decoration:none; color:#30373b;">Nosotros</a>
              </td>
            </tr>
            <tr>
              <td height="14" style="font-size:1px; line-height:1px;">&nbsp;</td>
            </tr>
            <tr>
              <td height="1" bgcolor="#eda598" style="font-size:0px; line-height:0px;"><img
                  src="https://www.sendwithus.com/assets/img/emailmonks/images/spacer.gif" width="2" height="2"
                  style="display:block;" border="0" alt="" /></td>
            </tr>
            <!-- === //NEVIGATION SECTION === -->
            <!-- === IMG WITH TEXT AND COUPEN CODE SECTION === -->
            <tr>
              <td valign="top" class="em_aside">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
  
                  <tr>
                    <td height="35" class="em_height">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:20px; font-weight:bold; line-height:18px; color:#30373b;">
                      Bienvenid@ ${nombre}</td>
                  </tr>
                  <tr>
                    <td height="15" class="em_height">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:20px; font-weight:bold; line-height:28px; color:#30373b;">
                      Activa tu cuenta de Calyaan y disfruta de todo lo que tenemos para ti</td>
                  </tr>
                  <tr>
                    <td height="22" style="font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
  
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; line-height:22px; color:#999999;">
                      Para poder acceder a Calyaan y disfrutar de todas las ventajas que te ofrece, debes confirmar tu
                      email haciendo click en el botón.
                    </td>
                  </tr>
  
                  <tr>
                    <td height="20" style="font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top" align="center">
                      <table width="210" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td valign="middle" align="center" height="45" bgcolor="#eda598"
                            style="font-family:'Open Sans', Arial, sans-serif; font-size:17px; font-weight:bold; color:#ffffff;">
                        
                            <a href="${process.env.FRONTEND_URL}/registro/confirmar/${token}"  target="_blank"
                                  style="color:#FFFFFF; text-decoration:underline;">Confirmar tu email</a>
                           
                            </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="12" style="font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:18px; font-weight:bold; line-height:20px; color:#eda598;">
                      ¡Gracias por registrarte a Calyaan!</td>
                  </tr>

                    <td height="10" class="em_height">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <tr>
        <td align="center" valign="top" bgcolor="#30373b" class="em_aside">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" class="em_main_table"
            style="table-layout:fixed;">
            <tr>
              <tr>
                   <td height="20" class="em_height">&nbsp;</td>
              </tr>
              <td align="center"
                style="font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:18px; color:#848789; text-transform:uppercase;">
                <span style="text-decoration:underline;"><a href="https://calyaan.com/privacidad/" target="_blank"
                    style="text-decoration:underline; color:#848789;">Privacidad</a></span>
                &nbsp;&nbsp;|&nbsp;&nbsp; <span style="text-decoration:underline;"><a
                    href="https://calyaan.com/habeas-data/" target="_blank"
                    style="text-decoration:underline; color:#848789;">Habeas-data</a></span><span class="em_hide">
                  &nbsp;&nbsp;|&nbsp;&nbsp; </span><span class="em_br"></span><span style="text-decoration:underline;"><a
                    href="https://calyaan.com/categoria-producto/centro-belleza-bogota/" target="_blank"
                    style="text-decoration:underline; color:#848789;">Tienda</a></span>
              </td>
            </tr>
  
            <tr>
              <td align="center"
                style="font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:18px; color:#848789;text-transform:uppercase;">
                Copyright © 2023 Calyaan
              </td>
            </tr>

            <tr>
               <td height="20" class="em_height">&nbsp;</td>
           </tr>

            <tr>
          </table>
        </td>
      </tr>
      </tr>
      <!-- === //FOOTER SECTION === -->
    </table>

  </body>
  
  </html>  
    `,
  });
};
// ENIVAR UN EMAIL PARA HABILITAR LA CREACION DE UNA NUEVA CONTRASEÑA
const emailOlvidePassword = async (data) => {
  const { nombre, email, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // infromacion para el email

  const info = await transport.sendMail({
    from: '"Calyaan" <calyaan@gmail.com.com>',
    to: email,
    subject: "Restablece tu contraseña",
    text: "calyaan",
    attachments: [{
      filename: 'Logo-Calyaan.webp',
      path: __dirname + '/public/images/Logo-Calyaan.webp',
      cid: 'logo'
    }
    ],
    html: `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <title>Bienvenida</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <meta name="format-detection" content="telephone=no" />
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!--<![endif]-->
    <style type="text/css">
      body {
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
      }
  
      img {
        border: 0 !important;
        outline: none !important;
      }
  
      p {
        Margin: 0px !important;
        Padding: 0px !important;
      }
  
      table {
        border-collapse: collapse;
        mso-table-lspace: 0px;
        mso-table-rspace: 0px;
      }
  
      td,
      a,
      span {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
  
      .ExternalClass * {
        line-height: 100%;
      }
  
      span.MsoHyperlink {
        mso-style-priority: 99;
        color: inherit;
      }
  
      span.MsoHyperlinkFollowed {
        mso-style-priority: 99;
        color: inherit;
      }
    </style>
    <style media="only screen and (min-width:481px) and (max-width:599px)" type="text/css">
      @media only screen and (min-width:481px) and (max-width:599px) {
        table[class=em_main_table] {
          width: 100% !important;
        }
  
        table[class=em_wrapper] {
          width: 100% !important;
        }
  
        td[class=em_hide],
        br[class=em_hide] {
          display: none !important;
        }
  
        img[class=em_full_img] {
          width: 100% !important;
          height: auto !important;
        }
  
        td[class=em_align_cent] {
          text-align: center !important;
        }
  
        td[class=em_aside] {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
  
        td[class=em_height] {
          height: 20px !important;
        }
  
        td[class=em_font] {
          font-size: 14px !important;
        }
  
        td[class=em_align_cent1] {
          text-align: center !important;
          padding-bottom: 10px !important;
        }
      }
    </style>
    <style media="only screen and (max-width:480px)" type="text/css">
      @media only screen and (max-width:480px) {
        table[class=em_main_table] {
          width: 100% !important;
        }
  
        table[class=em_wrapper] {
          width: 100% !important;
        }
  
        td[class=em_hide],
        br[class=em_hide],
        span[class=em_hide] {
          display: none !important;
        }
  
        img[class=em_full_img] {
          width: 100% !important;
          height: auto !important;
        }
  
        td[class=em_align_cent] {
          text-align: center !important;
        }
  
        td[class=em_align_cent1] {
          text-align: center !important;
          padding-bottom: 10px !important;
        }
  
        td[class=em_height] {
          height: 20px !important;
        }
  
        td[class=em_aside] {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
  
        td[class=em_font] {
          font-size: 14px !important;
          line-height: 28px !important;
        }
  
        span[class=em_br] {
          display: block !important;
        }
      }
    </style>
  </head>
  
  <body style="margin:0px; padding:0px;" bgcolor="#ffffff">
    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
  
      <!-- === //PRE HEADER SECTION=== -->
      <!-- === BODY SECTION=== -->
      <tr>
        <td align="center" valign="top" bgcolor="#ffffff">
          <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="em_main_table"
            style="table-layout:fixed;">
            <!-- === LOGO SECTION === -->
            <tr>
              <td height="40" class="em_height">&nbsp;</td>
            </tr>
            <tr>
              <td align="center"><a href="#" target="_blank" style="text-decoration:none;"><img
                    src="cid:logo" width="230" height="115"
                    style="display:block;font-family: Arial, sans-serif; font-size:15px; line-height:18px; color:#30373b;  font-weight:bold;"
                    border="0" alt="Logo Calyaan" /></a></td>
            </tr>
            <tr>
              <td height="30" class="em_height">&nbsp;</td>
            </tr>
            <!-- === //LOGO SECTION === -->
            <!-- === NEVIGATION SECTION === -->
          
            <tr>
              <td height="14" style="font-size:1px; line-height:1px;">&nbsp;</td>
            </tr>
            <tr>
              <td align="center"
                style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; line-height:18px; color:#30373b; text-transform:uppercase; font-weight:bold;"
                class="em_font">
                <a href="#" target="_blank" style="text-decoration:none; color:#30373b;">Centro de estética</a>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="_blank"
                  style="text-decoration:none; color:#30373b;">Tienda</a>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="_blank"
                  style="text-decoration:none; color:#30373b;">Blog</a> &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" target="_blank" style="text-decoration:none; color:#30373b;">Nosotros</a>
              </td>
            </tr>
            <tr>
              <td height="14" style="font-size:1px; line-height:1px;">&nbsp;</td>
            </tr>
            <tr>
              <td height="1" bgcolor="#eda598" style="font-size:0px; line-height:0px;"><img
                  src="https://www.sendwithus.com/assets/img/emailmonks/images/spacer.gif" width="2" height="2"
                  style="display:block;" border="0" alt="" /></td>
            </tr>
            <!-- === //NEVIGATION SECTION === -->
            <!-- === IMG WITH TEXT AND COUPEN CODE SECTION === -->
            <tr>
              <td valign="top" class="em_aside">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
  
                  <tr>
                    <td height="35" class="em_height">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:20px; font-weight:bold; line-height:18px; color:#30373b;">
                      Hola,${nombre}</td>
                  </tr>
                  <tr>
                    <td height="15" class="em_height">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:20px; font-weight:bold; line-height:28px; color:#30373b;">
                      Has realizado una solicitud de cambio de contraseña</td>
                  </tr>
                  <tr>
                    <td height="22" style="font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
  
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; line-height:22px; color:#999999;">
                      Para activar una nueva contraseña debes hacer click en el botón
                    </td>
                  </tr>
  
                  <tr>
                    <td height="20" style="font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top" align="center">
                      <table width="210" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td valign="middle" align="center" height="45" bgcolor="#eda598"
                            style="font-family:'Open Sans', Arial, sans-serif; font-size:17px; font-weight:bold; color:#ffffff;">
                        
                            <a href="${process.env.FRONTEND_URL}/nueva-password/${token}"  target="_blank"
                                  style="color:#FFFFFF; text-decoration:underline;">Nueva contraseña</a>
                           
                            </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="12" style="font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"
                      style="font-family:'Open Sans', Arial, sans-serif; font-size:18px; font-weight:bold; line-height:20px; color:#eda598;">
                      ¡Gracias por registrarte a Calyaan!</td>
                  </tr>

                    <td height="10" class="em_height">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <tr>
        <td align="center" valign="top" bgcolor="#30373b" class="em_aside">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" class="em_main_table"
            style="table-layout:fixed;">
            <tr>
              <tr>
                   <td height="20" class="em_height">&nbsp;</td>
              </tr>
              <td align="center"
                style="font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:18px; color:#848789; text-transform:uppercase;">
                <span style="text-decoration:underline;"><a href="https://calyaan.com/privacidad/" target="_blank"
                    style="text-decoration:underline; color:#848789;">Privacidad</a></span>
                &nbsp;&nbsp;|&nbsp;&nbsp; <span style="text-decoration:underline;"><a
                    href="https://calyaan.com/habeas-data/" target="_blank"
                    style="text-decoration:underline; color:#848789;">Habeas-data</a></span><span class="em_hide">
                  &nbsp;&nbsp;|&nbsp;&nbsp; </span><span class="em_br"></span><span style="text-decoration:underline;"><a
                    href="https://calyaan.com/categoria-producto/centro-belleza-bogota/" target="_blank"
                    style="text-decoration:underline; color:#848789;">Tienda</a></span>
              </td>
            </tr>
  
            <tr>
              <td align="center"
                style="font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:18px; color:#848789;text-transform:uppercase;">
                Copyright © 2023 Calyaan
              </td>
            </tr>

            <tr>
               <td height="20" class="em_height">&nbsp;</td>
           </tr>

            <tr>
          </table>
        </td>
      </tr>
      </tr>
      <!-- === //FOOTER SECTION === -->
    </table>

  </body>
  
  </html>  
    `,
  });
};

export { emailRegistro, emailOlvidePassword };
