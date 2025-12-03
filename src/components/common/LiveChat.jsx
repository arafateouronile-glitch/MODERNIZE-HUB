import { useEffect } from 'react'

// Crisp Chat Integration
// Remplacez 'YOUR_WEBSITE_ID' par votre vraie ID Crisp après inscription sur crisp.chat
const CRISP_WEBSITE_ID = 'YOUR_WEBSITE_ID'

export const LiveChat = () => {
  useEffect(() => {
    // Load Crisp Chat Script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";
      (function(){
        d=document;
        s=d.createElement("script");
        s.src="https://client.crisp.chat/l.js";
        s.async=1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    `
    document.head.appendChild(script)

    // Cleanup
    return () => {
      // Remove Crisp script on unmount
      const crispScript = document.querySelector('script[src*="crisp.chat"]')
      if (crispScript) {
        crispScript.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}



