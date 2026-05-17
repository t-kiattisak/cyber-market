import './ErrorFallback.css';

interface Props { error: Error; }

const ErrorFallback = ({ error }: Props) => (
  <div className="error-fallback">
    <p className="error-icon">⚠️</p>
    <h2>โหลด Micro-Frontend ไม่ได้</h2>
    <p>Remote service อาจยังไม่พร้อม</p>
    <code>{error.message}</code>
    <button id="btn-retry" onClick={() => window.location.reload()}>ลองใหม่</button>
  </div>
);

export default ErrorFallback;
