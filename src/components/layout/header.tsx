import Link from "next/link";
import { nav } from "../../config/nav";

export const Header = () => {
  return (
    <header className="container flex items-center justify-between py-10">
      <ul className="flex items-center gap-20">
        <li className="text-secondary text-sm leading-5 font-medium">
          Based in <br /> Ha Noi, Viet Nam
        </li>

        <li className="text-secondary text-sm leading-5 font-medium">
          Say hello <br />
          <Link href="mailto:vidongls12345@gmail.com" className="flat-btn">
            vidongls12345@gmail.com
          </Link>
        </li>
        <li className="text-secondary text-sm leading-5 font-medium">
          Switch to <br />
          <button className="flat-btn">Dark Mode</button>
        </li>
      </ul>

      <nav>
        <ul className="flex items-center gap-8">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flat-link text-primary text-base leading-6 font-medium uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
