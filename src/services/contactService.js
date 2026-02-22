import emailjs from "@emailjs/browser";

export const submitContactForm = async (data) => {
  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: data.name,
      email: data.email,
      business_name: data.businessName ?? "",
      message: data.message,
      time: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
