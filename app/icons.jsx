const paths = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  left: <path d="M20 12H5m6 6-6-6 6-6" />,
  external: <path d="M6 18 18 6M8 6h10v10" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  star: <path d="M12 2.9l2.76 5.59 6.17.9-4.46 4.34 1.05 6.14L12 16.98l-5.52 2.89 1.05-6.14-4.46-4.34 6.17-.9L12 2.9Z" fill="currentColor" stroke="none" />,
  pause: <path d="M9 5v14m6-14v14" />,
  play: <path d="m9 5 11 7-11 7z" />,
  pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
};

export function Icon({ name }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function Mark() {
  return <svg aria-hidden="true" className="mark" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x=".75" y=".75" width="42.5" height="42.5" rx="1" /><path d="M9 30V13l13 10 13-10v17M9 30l13-10 13 10M22 23v9" /></svg>;
}
