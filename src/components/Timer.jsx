const Timer = ({ seconds }) => {
  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-red-600 font-mono text-lg">
      ⏱ {formatTime(seconds)}
    </div>
  );
};

export default Timer;
