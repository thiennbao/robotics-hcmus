import clsx from 'clsx'
import style from './Heading.module.scss'

const Heading = ({Tag, extra, subcontent, className, children}) => {
  return (
    <Tag className={clsx(style.heading, extra && style.extra, className)} subcontent={subcontent}>{children}</Tag>
  )
}

export default Heading