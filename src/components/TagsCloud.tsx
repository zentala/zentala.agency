import React, { useState, useEffect, useRef } from 'react'
import { Tag, Tooltip } from 'antd'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  tagsCloud: {
    textAlign: 'center',
    lineHeight: '1rem',
    '& > span:not(:last-child)': {
      marginRight: '0rem' // odstęp między liniami
    }
  },
  tagItem: {
    margin: '0.5rem 2rem 0.5rem 2rem',
    display: 'inline-block',
    position: 'relative',
    '& > span.ant-tag': {
      fontSize: '1.8rem',
      lineHeight: '2rem',
      padding: '0.4rem 1.3rem 0.6rem',
      borderRadius: '2rem'
    }
  },
  separator: {
    color: 'rgba(0, 0, 0, 0.1)',
    fontSize: '3rem',
    // verticalAlign: 'middle',
    lineHeight: '0.5rem',
    position: 'absolute',
    top: '30%',
    // marginRight: '1rem',
    right: '-1.4rem'
  }
})

interface TagData {
  name: string
  description?: string
}

interface TagsCloudProps {
  tags: TagData[]
  style?: React.CSSProperties
}

const TagsCloud: React.FC<TagsCloudProps> = ({ tags, style }) => {
  const classes = useStyles()
  const [lastIndexes, setLastIndexes] = useState(new Set<number>())
  const cloudRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateLastIndexes = () => {
      if (cloudRef.current) {
        const children = Array.from(cloudRef.current.children)
        const lastIndexSet = new Set<number>()
        let top = null

        children.forEach((child, index) => {
          if (child instanceof HTMLElement) {
            if (top === null) {
              top = child.offsetTop
            }

            if (child.offsetTop > top) {
              lastIndexSet.add(index - 1)
              top = child.offsetTop
            }

            if (index === children.length - 1) {
              lastIndexSet.add(index)
            }
          }
        })

        setLastIndexes(lastIndexSet)
      }
    }

    window.addEventListener('resize', updateLastIndexes)
    updateLastIndexes()

    return () => {
      window.removeEventListener('resize', updateLastIndexes)
    }
  }, [tags])

  return (
    <div ref={cloudRef} className={classes.tagsCloud} style={style}>
      {tags.map((tag, index) => (
        <span key={tag.name} className={classes.tagItem}>
          {tag.description ? (
            <Tooltip title={tag.description}>
              <Tag className={classes.tag}>{tag.name}</Tag>
            </Tooltip>
          ) : (
            <Tag>{tag.name}</Tag>
          )}
          {!lastIndexes.has(index) && <span className={classes.separator}>•</span>}
        </span>
      ))}
    </div>
  )
}

export default TagsCloud
