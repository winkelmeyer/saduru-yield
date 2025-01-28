export function SavingsIllustration() {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background Circle */}
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="#f0fdf4"
        className="animate-pulse"
      />
      
      {/* Piggy Bank Body */}
      <path
        d="M280 200c0 44.183-35.817 80-80 80s-80-35.817-80-80 35.817-80 80-80 80 35.817 80 80z"
        fill="#047857"
        className="animate-bounce"
        style={{ animationDuration: '3s' }}
      />
      
      {/* Coin Slot */}
      <rect
        x="180"
        y="150"
        width="40"
        height="8"
        rx="4"
        fill="#f0fdf4"
      />
      
      {/* Ear */}
      <path
        d="M290 180c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30s13.431-30 30-30c16.569 0 30 13.431 30 30z"
        fill="#047857"
      />
      
      {/* Nose */}
      <circle
        cx="160"
        cy="200"
        r="15"
        fill="#f0fdf4"
      />
      
      {/* Coins */}
      <g className="animate-bounce" style={{ animationDelay: '0.2s' }}>
        <circle cx="120" cy="300" r="20" fill="#fbbf24" />
        <text x="110" y="306" fill="#fff" fontSize="16">$</text>
      </g>
      <g className="animate-bounce" style={{ animationDelay: '0.4s' }}>
        <circle cx="170" cy="320" r="20" fill="#fbbf24" />
        <text x="160" y="326" fill="#fff" fontSize="16">$</text>
      </g>
      <g className="animate-bounce" style={{ animationDelay: '0.6s' }}>
        <circle cx="220" cy="310" r="20" fill="#fbbf24" />
        <text x="210" y="316" fill="#fff" fontSize="16">$</text>
      </g>
      
      {/* Growth Arrow */}
      <path
        d="M100 280 L300 120"
        stroke="#047857"
        strokeWidth="4"
        strokeDasharray="8 8"
        className="animate-dash"
      />
      <path
        d="M280 100 L300 120 L320 100"
        stroke="#047857"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
} 