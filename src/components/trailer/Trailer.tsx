import css from './Trailer.module.scss';

interface TrailerProps {
  embedId: string;
  title: string;
}

const Trailer = ({ embedId, title }: TrailerProps) => {
  const altTitle = `Trailer of ${title}`;
  return (
    <div className={css["video-container"]}>
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={altTitle}
      />
    </div>
  );
};

export default Trailer;
