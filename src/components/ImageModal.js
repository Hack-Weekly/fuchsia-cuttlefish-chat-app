const ImageModal = ({ imgLink, setImageOpen }) => {
  return (
    <>
      <div
        style={{
          background: '#222222dd',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1000,
          display: 'flex',
        }}
        onClick={() => setImageOpen(false)}
      >
        <div
          style={{
            margin: 'auto',
          }}
        >
          <img alt='attachment' src={imgLink} style={{ maxWidth: '95vw' }} />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
