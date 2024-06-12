import { h } from 'nano-jsx';

export const Base = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo List</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>"
        />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/htmx2.0.min.js" />
        <script src="/htmx-response-targets.js" />
        <script src="/scripts.js" />
        {/* <script>htmx.logAll()</script> */}
      </head>
      <body hx-boost="true">{children}</body>
    </html>
  );
};
