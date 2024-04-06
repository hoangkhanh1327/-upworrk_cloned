import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({setImg,closePopup}) => {
  const signatureCanvasRef = useRef();

  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  const getSignatureImage = () => {
    const signatureImage = signatureCanvasRef.current.toDataURL();
      console.log(signatureImage);
    setImg(signatureImage);
    closePopup(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Chữ ký của bạn</h2>
      <div className="relative border border-gray-300 rounded-md">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 500, height: 200 }}
          ref={signatureCanvasRef}
        />
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={clearSignature}
        >
          Xóa chữ ký
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={getSignatureImage}
        >
          Lấy hình ảnh chữ ký
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
