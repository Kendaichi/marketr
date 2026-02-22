import { useEffect } from "react";

const FB_PAGE_ID = import.meta.env.VITE_FB_PAGE_ID;

export default function MessengerChat() {
  useEffect(() => {
    if (!FB_PAGE_ID) return;

    const chatbox = document.getElementById("fb-customer-chat");
    if (chatbox) {
      chatbox.setAttribute("page_id", FB_PAGE_ID);
      chatbox.setAttribute("attribution", "biz_inbox");
    }

    window.fbAsyncInit = function () {
      FB.init({ xfbml: true, version: "v18.0" });
    };

    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      const script = document.getElementById("facebook-jssdk");
      if (script) script.remove();
    };
  }, []);

  if (!FB_PAGE_ID) return null;

  return <div id="fb-customer-chat" className="fb-customerchat" />;
}
