export function Note() {
  return (
    <section aria-labelledby="note-title" className="bg-mist">
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <span aria-hidden="true" className="mx-auto mb-10 block h-3 w-3 rounded-full bg-peach ring-4 ring-sun/60" />
        <h2 id="note-title" className="text-4xl sm:text-5xl">
          Until the next little discovery.
        </h2>
        <div className="mt-8 space-y-5 text-slate">
          <p>
            Whether you’ve visited Korea, dream of coming someday, or simply enjoy discovering more about life here, I’m
            glad you found this little corner of the internet.
          </p>
          <p>I hope Korea Mail Club brings a bit of Korea into your world.</p>
        </div>
        <p className="mt-10 font-display text-2xl font-semibold text-accent">From Seoul, with love.</p>
      </div>
    </section>
  );
}
