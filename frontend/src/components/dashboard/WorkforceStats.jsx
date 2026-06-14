const WorkforceStats = ({
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="glass rounded-[30px] p-8 glow">

      <p className="text-gray-400 uppercase tracking-[3px]">
        {title}
      </p>

      <h1 className="text-6xl font-black mt-6">
        {value}
      </h1>

      <p className="text-purple-400 text-lg mt-4">
        {subtitle}
      </p>

    </div>
  )
}

export default WorkforceStats