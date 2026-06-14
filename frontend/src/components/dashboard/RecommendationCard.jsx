const RecommendationCard = ({
  title,
}) => {
  return (
    <div className="glass rounded-[30px] p-7 glow">

      <div className="flex items-start gap-5">

        {/* ICON */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl shrink-0">

          💡

        </div>

        {/* TEXT */}
        <div>

          <h1 className="text-2xl font-bold leading-relaxed">
            {title}
          </h1>

        </div>

      </div>

    </div>
  )
}

export default RecommendationCard