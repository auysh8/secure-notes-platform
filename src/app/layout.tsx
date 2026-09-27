import "../index.css"; 

export const metadata = {
  title: "Secure Notes Platform",
  description: "A secure notes app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
