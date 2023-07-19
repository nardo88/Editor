import {
  CompositeDecorator,
  DraftEntityMutability,
  EditorState,
  RichUtils,
} from 'draft-js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BlockType, EntityType, InlineStyle } from './config'
import LinkDecorator from '../ui/Link/decorator'
import { HTMLtoState, stateToHTML } from './convert'

export type HTMLType = ReturnType<typeof stateToHTML>

export type EditorApi = {
  state: EditorState
  onChange: (state: EditorState) => void
  toggleBlockType: (blockType: BlockType) => void
  currentBlockType: BlockType
  toggleInlineStyle: (inlineStyle: InlineStyle) => void
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean
  addLink: (url: string) => void
  setEntityData: (entityKey: string, data: any) => void
  toHtml: () => HTMLType
}

/* Объединям декораторы в один */
const decorator = new CompositeDecorator([LinkDecorator])

export const useEditor = (html?: string): EditorApi => {
  console.log('html: ', html)
  // С помощью метода EditorState.createEmpty() мы создаем пустое имутабельное состояние нашего редактора и сохраняем его в локальном состоянии.
  const [state, setState] = useState(() =>
    html
      ? EditorState.createWithContent(HTMLtoState(html), decorator)
      : EditorState.createEmpty(decorator)
  )
  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType)
    )
  }, [])
  const currentBlockType = useMemo(() => {
    // получаем карту, в которой хранится информация о том, где находится каретка пользователя. Напомню что Draft.js работает с имутабельными данными, и чтобы посмотреть что хранится в selection, можно воспользоваться методом toJS
    const selection = state.getSelection()
    // получаем карту контента нашего редактора.
    const content = state.getCurrentContent()
    // по ключу находим блок, в котором сейчас находимся. Ключ — это просто уникальный хеш, который сгенерировал Draft.js.
    const block = content.getBlockForKey(selection.getStartKey())
    // получаем тип найденного блока.
    return block.getType() as BlockType
  }, [state])

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) =>
      RichUtils.toggleInlineStyle(currentState, inlineStyle)
    )
  }, [])

  const hasInlineStyle = useCallback(
    (inlineStyle: InlineStyle) => {
      /* Получаем иммутабельный Set с ключами стилей */
      const currentStyle = state.getCurrentInlineStyle()
      /* Проверяем содержится ли там переданный стиль */
      return currentStyle.has(inlineStyle)
    },
    [state]
  )

  const addEntity = useCallback(
    (
      entityType: EntityType,
      data: Record<string, string>,
      mutability: DraftEntityMutability
    ) => {
      setState((currentState) => {
        /* Получаем текущий контент */
        const contentState = currentState.getCurrentContent()
        /* Создаем Entity с данными */
        const contentStateWithEntity = contentState.createEntity(
          entityType,
          mutability,
          data
        )
        /* Получаем уникальный ключ Entity */
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        /* Обьединяем текущее состояние с новым */
        const newState = EditorState.set(currentState, {
          currentContent: contentStateWithEntity,
        })
        /* Вставляем ссылку в указанное место */
        return RichUtils.toggleLink(
          newState,
          newState.getSelection(),
          entityKey
        )
      })
    },
    []
  )

  const addLink = useCallback(
    (url: string) => {
      addEntity(EntityType.link, { url }, 'MUTABLE')
    },
    [addEntity]
  )

  const setEntityData = useCallback((entityKey: string, data: any) => {
    setState((currentState) => {
      /* Получаем текущий контент */
      const content = currentState.getCurrentContent()
      /* Объединяем текущие данные Entity с новыми */
      const contentStateUpdated = content.mergeEntityData(entityKey, data)
      /* Обновляем состояние редактора с указанием типа изменения */
      return EditorState.push(currentState, contentStateUpdated, 'apply-entity')
    })
  }, [])

  const toHtml = useCallback(() => {
    return stateToHTML(state.getCurrentContent())
  }, [state])

  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      addLink,
      setEntityData,
      toHtml,
    }),
    [
      state,
      toggleInlineStyle,
      hasInlineStyle,
      toHtml,
      html,
      setEntityData,
      addLink,
      currentBlockType,
    ]
  )
}
