import { QRCodeCanvas } from "qrcode.react";

const QrGenerate = ({ orderId }) => {
  if (!orderId) return null;

  const qrValue = JSON.stringify({
    orderId,
    type: "meal-order",
  });

  return (
    <div className="flex justify-center mt-6">
      <QRCodeCanvas
        value={qrValue}
        size={220}
        level="H"
        includeMargin={true}
      />
    </div>
  );
};

export default QrGenerate;
