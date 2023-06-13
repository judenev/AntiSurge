const nodemailer = require('nodemailer')
const Mailgen  =require('mailgen');

module.exports={
    emailSender : async(data)=>{
        try{
                 console.log(data,"emaildata");
    console.log("nnaana",process.env.USER_NAME);
                //configuring nodemailer sender data
                const config = {
                    service: 'gmail',
                    auth: {
                        user: process.env.USER_NAME,
                        pass: process.env.PASS
                    }
                };
    
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport(config);
    
                // Using mailgen creating a better mail format
                const MailGenerator = new Mailgen({
                    theme: 'default',
                    product: {
                        name: 'Anti-Surge',
                        link: 'https://mailgen.js/'
                    }
                });
    
                const response = {
                    body: {
                        intro: ` Greetings Employee.Your Password is :${data.Password} .Also verify your email address and sign in to your Anti-Surge account`
                    }
                };
    
                const mail = MailGenerator.generate(response);
    
                const message = {
                    from: process.env.USER_NAME, // sender address
                    to: 'pemaje7935@soombo.com', // list of receivers
                    subject: ' Employee Credentials for login', // Subject line
                    html: mail
                };  
    
                // sending mail
                const result = await transporter.sendMail(message);
                console.log({result})
                return {result};
    
        }catch(err){
            console.log(err)
        }
    }

} 