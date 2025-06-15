import { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and append the script
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/684e3975c2de78190f318d19/1itop0tfc';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    // Insert the script
    const s0 = document.getElementsByTagName('script')[0];
    s0.parentNode.insertBefore(s1, s0);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      if (s1 && s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component doesn't render anything visible
};

export default LiveChat; 