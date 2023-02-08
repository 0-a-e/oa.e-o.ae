export default ({size=24, color = "white"}: {size?: number, color?: string}) => (
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
      class="feather feather-search"
    >
      <line x1="13" y1="4" x2="13" y2="20"></line>
    </svg>
  );
  