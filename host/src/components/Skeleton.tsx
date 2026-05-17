import './Skeleton.css';

const Skeleton = () => (
  <div className="skeleton-wrap">
    <div className="skeleton-bar w50 shimmer" />
    <div className="skeleton-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img shimmer" />
          <div className="skeleton-body">
            <div className="skeleton-line w30 shimmer" />
            <div className="skeleton-line w80 shimmer" />
            <div className="skeleton-line w60 shimmer" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
