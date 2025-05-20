type Props = {
  children: React.ReactNode
  title: string
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export const SectionWrapper = ({
  children,
  title,
  className,
  ...props
}: Props) => {
  return (
    <section {...props}>
      <h2 className='text-dell-900 border-b-chathams-blue-900 mb-4 border-b pb-4 text-[64px] leading-[102px] font-medium uppercase'>
        {title}
      </h2>
      <div className={className}>{children}</div>
    </section>
  )
}
