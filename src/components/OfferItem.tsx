import { useIntl } from 'gatsby-plugin-intl'
import React from 'react'
import { createUseStyles } from 'react-jss'

interface OfferItemProps {
  number: number
  titleId: string
  descriptionId: string
  iconSrc?: string
  Icon?: React.ElementType
  backgroundColor?: string
}

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    backgroundColor: (props: OfferItemProps) => props.backgroundColor || 'transparent',
    borderRadius: '0.5em',
    padding: '4em',
    overflow: 'hidden'
  },
  icon: {
    // float: 'right',
    fontSize: '20em',
    position: 'absolute',
    top: '-0.15em',
    right: '-0.15em',
    color: 'rgba(0,0,0,0.1)'
  },
  number: {
    position: 'absolute',
    top: 0,
    left: '0.3em',
    fontSize: '7em',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.2)'
  },
  header: {
    marginTop: '0.5em',
    fontSize: '2em'
  },
  lead: {
    fontSize: '1.4em',
    zIndex: 5
  }
})

const OfferItem: React.FC<OfferItemProps> = props => {
  const { number, titleId, descriptionId, iconSrc, Icon } = props
  const classes = useStyles(props)
  const intl = useIntl()

  const translatedTitle = intl.formatMessage({ id: titleId })
  const translatedDescription = intl.formatMessage({ id: descriptionId })

  return (
    <div className={classes.container}>
      {iconSrc && <img src={iconSrc} className={`${classes.icon} pull-right`} />}
      {Icon && <Icon className={`${classes.icon} pull-right`} />}
      <span className={classes.number}>{number}</span>
      <h3 className={classes.header}>{translatedTitle}</h3>
      <p className={classes.lead}>{translatedDescription}</p>
    </div>
  )
}

export default OfferItem
