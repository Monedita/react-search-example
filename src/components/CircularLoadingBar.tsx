interface CircularLoadingBarProps {
  max: number;
  value: number;
  size?: number; // diámetro en px
  strokeWidth?: number; // grosor del círculo
  color?: string;
  // bgColor?: string;
}

export default function CircularLoadingBar({
  max,
  value,
  size = 72,
  strokeWidth = 6,
  color = '#3b82f6',
  // bgColor = '#e5e7eb',
}: CircularLoadingBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value / max, 0), 1);
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="absolute top-0 left-0">

      {/* <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
      /> */}

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s' }}
      />

      {/* <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14px"
        fill={color}
        fontWeight="bold"
      >
        {Math.round(progress * 100)}%
      </text> */}
      
    </svg>
  );
}
