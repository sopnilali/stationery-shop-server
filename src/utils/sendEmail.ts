

import nodemailer from 'nodemailer'
import config from '../config';

export const sendMail = async(to: string, html: string)=> {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === 'production',
        auth: {
          user: "sopnilstar@gmail.com",
          pass: "zbgq npak wrsd khwv",
        },
      });


      await transporter.sendMail({
        from: 'sopnilstar@gmail.com', // sender address
        to, // list of receivers
        subject: 'Reset your password within twenty mins!', // Subject line
        text: '', // plain text body
        html, // html body
      });
      
}