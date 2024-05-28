"use client";

import { useFormStatus } from 'react-dom';

export default function SyncButton() {
  const status = useFormStatus();

  if (status.pending) {
    return <p>Creating post...</p>;
  }

  return (
    <>
      <button>Synchronize</button>
    </>
  );
}
