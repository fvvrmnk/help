export function SEOTextBlock(props: { title: string; text: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <div className="rounded-2xl border border-border/70 bg-muted/20 p-6 md:p-10">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          {props.title}
        </h2>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
          {props.text}
        </p>
      </div>
    </section>
  );
}
