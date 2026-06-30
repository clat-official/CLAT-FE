export default function DragHandle() {
  return (
    <span className="flex flex-col gap-[3px] cursor-grab text-fg-disabled shrink-0 w-4 items-center active:cursor-grabbing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex gap-[2px]">
          <span className="w-[3px] h-[3px] rounded-full bg-current" />
          <span className="w-[3px] h-[3px] rounded-full bg-current" />
        </span>
      ))}
    </span>
  )
}
