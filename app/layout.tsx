import "../styles/globals.css";

import { ReactQueryRoot } from "./ReactQueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <ReactQueryRoot>{children}</ReactQueryRoot>
      </body>
    </html>
  );
}
