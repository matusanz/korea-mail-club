"use client";

import { useEffect, useRef, useState } from "react";
import { isTallySubmit, tallyEmbedUrl, tallyPublicUrl } from "../lib/tally";

const EMBED_SCRIPT = "https://tally.so/widgets/embed.js";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

/** Load Tally's embed script once; it sizes the iframe (dynamicHeight). Without it the iframe still works. */
function loadTally() {
  const run = () => {
    if (window.Tally) window.Tally.loadEmbeds();
    else
      document.querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])").forEach((f) => {
        f.src = f.dataset.tallySrc ?? "";
      });
  };
  if (window.Tally) return run();
  if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
  const s = document.createElement("script");
  s.src = EMBED_SCRIPT;
  s.async = true;
  s.onload = run;
  s.onerror = run;
  document.body.appendChild(s);
}

export function TallyForm({ formId, title }: { formId: string; title: string }) {
  const [submitted, setSubmitted] = useState(false);
  const thanksRef = useRef<HTMLDivElement>(null);

  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadTally();
    // Safety net (blocked or slow script, strict in-app browsers): show the form anyway.
    const fallback = window.setTimeout(() => {
      const f = frameRef.current;
      if (f && !f.getAttribute("src")) f.src = f.dataset.tallySrc ?? "";
    }, 2500);
    function onMessage(e: MessageEvent) {
      if (isTallySubmit(e.origin, e.data, formId)) setSubmitted(true);
    }
    window.addEventListener("message", onMessage);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("message", onMessage);
    };
  }, [formId]);

  useEffect(() => {
    if (submitted) thanksRef.current?.focus();
  }, [submitted]);

  if (submitted) {
    return (
      <div ref={thanksRef} tabIndex={-1} role="status" className="mx-auto max-w-md py-6 text-center outline-none">
        <span aria-hidden="true" className="mx-auto mb-6 block h-3 w-3 rounded-full bg-peach ring-4 ring-sun/60" />
        <h3 className="text-3xl sm:text-4xl">Thank you for joining!</h3>
        <p className="mt-4 text-slate">
          I’m so glad you’d like to receive a little piece of Korea. If you’re selected for an upcoming postcard mailing,
          it’ll be on its way to the address you shared.
        </p>
      </div>
    );
  }

  return (
    <div>
      <iframe
        ref={frameRef}
        data-tally-src={tallyEmbedUrl(formId)}
        loading="lazy"
        width="100%"
        height="1130"
        title={title}
        className="block min-h-[600px] w-full border-0"
      />
      <noscript>
        <p className="text-center">
          <a href={tallyPublicUrl(formId)} className="font-semibold underline underline-offset-4">
            Open the postcard registration form
          </a>
        </p>
      </noscript>
    </div>
  );
}
