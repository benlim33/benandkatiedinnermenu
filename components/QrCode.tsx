import QRCode from "qrcode";

// Rendered at build time, so the QR ships as inline SVG with zero client JS.
export async function QrCode({ url, size = 160 }: { url: string; size?: number }) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#0e0e10", light: "#00000000" },
  });

  return (
    <div
      style={{ width: size, height: size }}
      role="img"
      aria-label={`QR code linking to ${url}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
