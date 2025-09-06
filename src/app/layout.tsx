import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sparrow",
  description: "Simple sparrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const menu = [
    {
      name: "首页",
      href: "/",
    },
    {
      name: "资产",
      href: "/assets",
    },
    {
      name: "自习室",
      href: "/studyroom",
    },
    {
      name: "积分",
      href: "/points",
    },
    {
      name: "我的",
      href: "/my",
    },
  ];

  return (
    <html lang="en" className="bg-gray-100">
      <body className="max-w-[375px] mx-auto py-11">
        {children}
        <div className="home-nav w-[80%] flex justify-between mx-auto py-4 px-8">
          {menu.map((item) => {
            return (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            )
          })}
        </div>
      </body>
    </html>
  );
}
