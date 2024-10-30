"use client";

type WikiPageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function WikiPageError({ error, reset }: WikiPageErrorProps) {
  return (
    <p>
      Wiki Page Error
      <button onClick={reset}>Reset</button>
      {error.message && <p>{error.message}</p>}
    </p>
  );
}
