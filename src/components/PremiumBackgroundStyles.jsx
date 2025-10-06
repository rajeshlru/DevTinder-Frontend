const PremiumBackgroundStyles = () => (
  <style>
    {`
      @keyframes move-orb-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(40px, -40px) scale(1.1); }
        66% { transform: translate(-30px, 50px) scale(0.9); }
      }
      
      @keyframes move-orb-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-50px, 30px) scale(1.05); }
        66% { transform: translate(40px, -20px) scale(0.95); }
      }
      
      @keyframes move-orb-3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, 50px) scale(1.07); }
        66% { transform: translate(-40px, -30px) scale(0.93); }
      }
      
      @keyframes float-particle {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.7; }
        50% { transform: translateY(-30px) rotate(180deg) scale(1.2); opacity: 1; }
      }
      
      @keyframes slide-line {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      .animate-move-orb-1 {
        animation: move-orb-1 20s ease-in-out infinite;
      }
      
      .animate-move-orb-2 {
        animation: move-orb-2 25s ease-in-out infinite;
      }
      
      .animate-move-orb-3 {
        animation: move-orb-3 30s ease-in-out infinite;
      }
      
      .animate-float-particle {
        animation: float-particle 20s ease-in-out infinite;
      }
      
      .glass-effect {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.5);
      }
      
      .premium-card-hover {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .premium-card-hover:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px -12px rgba(109, 40, 217, 0.25);
      }
      
      .shimmer-button {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}
  </style>
);

export default PremiumBackgroundStyles;
