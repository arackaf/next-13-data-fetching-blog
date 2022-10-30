import "../styles/globals.css";

import { ReactQueryRoot } from "./ReactQueryProvider";

export default function RootLayout(props: any) {
  console.log("layout", { props });
  return (
    <html>
      <head></head>
      <body>
        <ReactQueryRoot>{props.children}</ReactQueryRoot>
      </body>
    </html>
  );
}
