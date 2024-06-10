interface Props {
  id: number
  title: string
  description: string
  isCompleted: boolean
  onCheck: (id: number, newValue: boolean) => void
  onDelete: (id: number) => void
}
export const TodoItem = ({ id, title, description, isCompleted, onDelete, onCheck }: Props) => {

  const handleCheckPress = () => {
    onCheck(id, !isCompleted)
  }

  return (<div className="flex p-4 bg-slate-200 gap-2 rounded-lg w-full mt-2">
    <input type="checkbox" checked={isCompleted}
      onClick={handleCheckPress}
      readOnly />
    <div className="flex justify-between flex-1 items-center">
      <div>
        <h4 className="text-2xl">{title}</h4>
        <p className="text-slate-700">{description}</p>
      </div>
      <div className="flex gap-3">
        <button className="bg-blue-600 p-2 rounded-md active:scale-90">✏️</button>
        <button className="bg-red-600 p-2 rounded-md active:scale-90"
          onClick={() => onDelete(id)}
        >🗑️</button>
      </div>
    </div>
  </div>)
}