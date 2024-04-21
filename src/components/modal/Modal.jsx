import { useEffect } from 'react';

function Modal(props) {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      props.click(event);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <div className="Overlay" onClick={props.click}>
        <div className="Modal">
          <img className="img--modal" src={props.src} alt={props.alt} />
        </div>
      </div>
    </>
  );
}

export default Modal;
