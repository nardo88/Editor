import { FC, ReactNode } from 'react'
import cls from './Link.module.scss'
import { classNames } from '@helpers/classNames'
import { ContentState } from 'draft-js'
import { useEditorApi } from '../../module/context'

interface Link {
  className?: string
  children: ReactNode
  contentState: ContentState
  entityKey: string
}

export const Link: FC<Link> = (props) => {
  const { className, children, contentState, entityKey } = props
  const { url } = contentState.getEntity(entityKey).getData()
  const { setEntityData } = useEditorApi()

  const handlerClick = () => {
    const newUrl = prompt('URL:', url)
    if (newUrl) {
      setEntityData(entityKey, { url: newUrl })
    }
  }
  return (
    <a
      href={url}
      onClick={handlerClick}
      className={classNames(cls.Link, {}, [className])}>
      {children}
    </a>
  )
}
