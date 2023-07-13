import { EditorState } from 'draft-js'
import { useMemo, useState } from 'react'

export type EditorApi = {
  state: EditorState
  onChange: (state: EditorState) => void
}

export const useEditor = (): EditorApi => {
  // С помощью метода EditorState.createEmpty() мы создаем пустое имутабельное состояние нашего редактора и сохраняем его в локальном состоянии.
  const [state, setState] = useState(() => EditorState.createEmpty())

  return useMemo(
    () => ({
      state,
      onChange: setState,
    }),
    [state]
  )
}
