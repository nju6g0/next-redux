function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-5/6 min-h-1/2 lg:w-1/2 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <h1>i'm a modal</h1>
        {children}
      </div>
    </div>
  );
}

export default Modal;
