export const RightArrowIcon = ({
  size = 24,
  color = "white",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-arrow-right"
  >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);
