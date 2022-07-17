import emailjs from "@emailjs/browser";
let isSent;
const sendMail = async (params) => {
  try {
    const response = await emailjs.send(
      `${process.env.REACT_APP_SERVICE_ID}`,
      `${process.env.REACT_APP_TEMPLATE_ID}`,
      params,
      `${process.env.REACT_APP_PUBLIC_KEY}`
    );
    if (response) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const mailService = { sendMail };
export default mailService;
