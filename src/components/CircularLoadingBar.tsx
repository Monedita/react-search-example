interface CircularLoadingBarProps {
  progress: number;
  size?: number; // diámetro en px
  strokeWidth?: number; // grosor del círculo
  color?: string;
}

export default function CircularLoadingBar({
  progress,
  size = 72,
  strokeWidth = 6,
  color = '#3b82f6',
}: CircularLoadingBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="absolute top-0 left-0">

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
      
    </svg>
  );
}
