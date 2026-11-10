// Small inline icons so the app needs no icon library.
const PATHS = {
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3',
  send: 'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7z',
  speaker: 'M11 5 6 9H3v6h3l5 4V5z M15.5 8.5a5 5 0 0 1 0 7 M18.5 5.5a9 9 0 0 1 0 13',
  stop: 'M7 7h10v10H7z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  external: 'M14 4h6v6 M20 4 10 14 M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7 M20 4v7h-7',
  copy: 'M9 9h11v11H9z M5 15H4V4h11v1',
  chat: 'M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20z',
  printer: 'M7 9V3h10v6 M7 17H4v-7h16v7h-3 M7 14h10v7H7z',
  // the Jan Setu mark: an arch bridge over water
  logo: 'M2 15h20 M4 15C4 7 20 7 20 15 M8 9.8V15 M12 8.5V15 M16 9.8V15 M2 19.5q2.5-2 5 0t5 0 5 0 5 0',
}

export default function Icon({ name, size = 20, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
