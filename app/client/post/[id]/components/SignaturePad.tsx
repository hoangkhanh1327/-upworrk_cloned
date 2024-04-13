import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

type ISignaturePad = {
  setImg: (img: string) => void;
  closePopup?: (isOpen: boolean) => void;
};

const SignaturePadSimple = ({ setImg, closePopup }: ISignaturePad) => {
  const signatureCanvasRef = useRef<SignatureCanvas | null>(null);

  const clearSignature = () => {
    signatureCanvasRef.current?.clear();
  };

  const getSignatureImage = () => {
    const signatureImage = signatureCanvasRef.current?.toDataURL();
    console.log(signatureImage);
    setImg(signatureImage ?? "");
    if (closePopup) {
      closePopup(false);
    }
  };

  return (
    <>
      <div className="relative border border-gray-300 rounded-md">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 500, height: 200 }}
          ref={signatureCanvasRef}
        />
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={clearSignature}
        >
          Xóa chữ ký
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={getSignatureImage}
        >
          Lấy hình ảnh chữ ký
        </button>
      </div>
      </>
  );
};

export default SignaturePadSimple;
