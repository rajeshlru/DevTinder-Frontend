const GlobalStyle = () => (
  <style jsx global>{`
    @keyframes float {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(5deg);
      }
    }
    @keyframes float-slow {
      0%,
      100% {
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-15px) scale(1.05);
      }
    }
    @keyframes fall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    @keyframes pulse-slow {
      0%,
      100% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
    }
    @keyframes pulse-fast {
      0%,
      100% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.6;
      }
    }
    @keyframes ping-slow {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      75%,
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-slow {
      animation: float-slow 8s ease-in-out infinite;
    }
    .animate-fall {
      animation: fall 4s linear infinite;
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animate-pulse-fast {
      animation: pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animate-ping-slow {
      animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    .animate-spin-slow {
      animation: spin-slow 3s linear infinite;
    }
    .bg-grid-pattern {
      background-image: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px
      );
      background-size: 30px 30px;
    }
    .bg-crack-pattern {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3 8 2 12-4 16M35 8c8 0 12 2 16 7M70 38c0 6-2 9-7 13M82 68c-3 3-6 2-10 1M68 82c-6 0-9-2-13-7M38 70c-6 0-9 2-13 7M18 89c-8-3-12-2-16-4M8 65c0-8 2-12 7-16M32 35c0-8-2-12-7-16M62 11c8 3 12 2 16-4M89 32c-3-8-2-12 4-16M65 8c-8 0-12 2-16 7M30 32c0-6 2-9 7-13M18 11c3-3 6-2 10-1M32 18c6 0 9-2 13-7M62 30c6 0 9-2 13-7M82 32c8 3 12 2 16-4' stroke='rgba(255,255,255,0.1)' fill='none' stroke-width='1'/%3E%3C/svg%3E");
    }
    .bg-network-pattern {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='50' cy='20' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='80' cy='20' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='20' cy='50' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='50' cy='50' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='80' cy='50' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='20' cy='80' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='50' cy='80' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='80' cy='80' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Cline x1='20' y1='20' x2='50' y2='20' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='50' y1='20' x2='80' y2='20' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='20' y1='50' x2='50' y2='50' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='50' y1='50' x2='80' y2='50' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='20' y1='80' x2='50' y2='80' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='50' y1='80' x2='80' y2='80' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='20' y1='20' x2='20' y2='50' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='50' y1='20' x2='50' y2='50' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='80' y1='20' x2='80' y2='50' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='20' y1='50' x2='20' y2='80' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='50' y1='50' x2='50' y2='80' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cline x1='80' y1='50' x2='80' y2='80' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3C/svg%3E");
    }
  `}</style>
);

export default GlobalStyle;
