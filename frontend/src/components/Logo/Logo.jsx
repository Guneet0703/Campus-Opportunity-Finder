const Logo = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    {/* Compass - primary shape, needle pointing upward for growth */}
    <circle cx="32" cy="36" r="21" fill="var(--primary-color)" />
    <circle cx="32" cy="36" r="21" fill="none" stroke="var(--secondary-color)" strokeWidth="1.5" />
    <path d="M32 20 L36 36 L32 44 L28 36 Z" fill="var(--accent-color)" />
    <circle cx="32" cy="36" r="3" fill="#FAFAFC" />

    {/* Graduation cap on top of the compass */}
    <path d="M14 14 L32 8 L50 14 L32 20 Z" fill="var(--secondary-color)" />
    <path d="M20 16.5 V23 C20 26 26 28 32 28 C38 28 44 26 44 23 V16.5" fill="none" stroke="var(--secondary-color)" strokeWidth="2" />

    {/* Star above the cap - achievement and ambition */}
    <path
      d="M32 0 L33.8 4.6 L38.5 5 L34.9 8 L36 12.6 L32 10 L28 12.6 L29.1 8 L25.5 5 L30.2 4.6 Z"
      fill="var(--accent-color)"
    />
  </svg>
);

export default Logo;
