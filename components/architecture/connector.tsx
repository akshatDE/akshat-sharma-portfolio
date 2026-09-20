/** Decorative arrow between diagram stages. */
export function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <svg
        width="9"
        height="22"
        viewBox="0 0 9 22"
        fill="none"
        className="text-border-strong"
      >
        <path
          d="M4.5 0v16"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M1 14.5 4.5 19 8 14.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
