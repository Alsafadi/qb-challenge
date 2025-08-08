import { LayoutGrid, ListIcon } from 'lucide-react'

export const ListGridToggle = ({
  isGrid,
  setIsGrid,
}: {
  isGrid: boolean
  setIsGrid: (isGrid: boolean) => void
}) => {
  const ListClass =
    'transition-colors ' +
    (isGrid
      ? 'bg-blurple/30 p-2 px-3 rounded-l-full hover:scale-110'
      : 'bg-blurple p-2 px-3 rounded-l-full hover:scale-110')
  const GridClass =
    'transition-colors ' +
    (isGrid
      ? 'bg-blurple p-2 px-3 rounded-r-full hover:scale-110'
      : 'bg-blurple/30 p-2 px-3 rounded-r-full hover:scale-110')

  // added max-md:hidden to hide the toggle on smaller screens and only consider the list view
  return (
    <div className="max-md:hidden">
      <button onClick={() => setIsGrid(!isGrid)} aria-label="Toggle View">
        <div className="flex items-center">
          <div className={ListClass}>
            <ListIcon color="white" />
          </div>
          <div className={GridClass}>
            <LayoutGrid />
          </div>
        </div>
      </button>
    </div>
  )
}
