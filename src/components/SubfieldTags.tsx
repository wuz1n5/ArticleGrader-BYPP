interface SubfieldTagsProps {
  subfields: string[];
}

// Small, low-contrast chips — intentionally less visually prominent than
// category/title. Display-only: no click behavior, no filtering.
export default function SubfieldTags({ subfields }: SubfieldTagsProps) {
  if (subfields.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {subfields.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
