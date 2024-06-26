import css from "./Trailer.module.scss";

interface TrailerProps {
  videoId: string;
  title: string;
}

const Trailer = ({ videoId, title }: TrailerProps) => {
  const altTitle = `Trailer of ${title}`;

  return (
    <div className={css["video-container"]}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title={altTitle}
      />
    </div>
  );
};

export default Trailer;
