interface Props {
  label: string
  active: boolean
  onClick: () => void
}

export default function CategoryChip({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all ${
        active
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
      }`}
    >
      {label}
    </button>
  )
}
