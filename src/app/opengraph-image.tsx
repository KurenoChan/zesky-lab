import { ImageResponse } from "next/og";

export const alt = "Zesky Lab — ideas into working systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#06080b", color: "#eef3f7", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#a7f3d0", fontSize: 22, letterSpacing: 4 }}><span>ZESKY LAB</span><span>SOFTWARE ENGINEER</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 102, lineHeight: .94, letterSpacing: -6 }}>Ideas into</span><span style={{ fontSize: 102, lineHeight: .94, letterSpacing: -6, color: "#8d99a6" }}>working systems.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#8d99a6", fontSize: 20 }}><span>ARCHITECTURE / INTERACTION / DELIVERY</span><span>KL · MY</span></div>
    </div>,
    size,
  );
}
