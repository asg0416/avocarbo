// app/api/og/route.tsx
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // ?title=<title>
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Zero Sugar";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <img
          width="256"
          height="256"
          src={`${process.env.NEXT_PUBLIC_API_URL}/exchange.png`}
          style={{
            borderRadius: 128,
          }}
          alt="Logo"
        />
        <div style={{ marginTop: 40 }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// app/page.tsx
// import { Metadata } from "next";

// export async function generateMetadata(): Promise<Metadata> {
//   const title = "Zero Sugar";
//   return {
//     openGraph: {
//       images: [`/api/og?title=${encodeURIComponent(title)}`],
//     },
//   };
// }

// export default function Page() {
//   return <h1>Zero Sugar</h1>;
// }
